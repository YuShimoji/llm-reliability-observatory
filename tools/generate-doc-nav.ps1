[CmdletBinding()]
param(
    [string]$Root,
    [string]$OutFile,
    [switch]$Force
)

if (-not $Root) {
    $scriptRoot = if ($PSScriptRoot) {
        $PSScriptRoot
    } else {
        Split-Path -Parent $MyInvocation.MyCommand.Path
    }

    $Root = (Resolve-Path -LiteralPath (Join-Path $scriptRoot '..')).Path
}

$rootPath = (Resolve-Path -LiteralPath $Root).Path
$excludedDirectoryNames = @(
    '.git',
    'node_modules',
    'dist',
    'build',
    '.venv',
    'venv',
    '__pycache__',
    '.next',
    '.mkdocs-site'
)
$generatedDocViewFiles = @(
    'docs/index.md',
    'docs/_root_README.md'
)

function Convert-ToRepositoryPath {
    param([string]$Path)

    $resolvedPath = (Resolve-Path -LiteralPath $Path).Path
    $rootPrefix = $rootPath.TrimEnd('\', '/') + [System.IO.Path]::DirectorySeparatorChar

    if (-not $resolvedPath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Path is outside repository root: $resolvedPath"
    }

    return $resolvedPath.Substring($rootPrefix.Length).Replace('\', '/')
}

function Test-IsExcludedPath {
    param([string]$RelativePath)

    $parts = $RelativePath -split '/'
    foreach ($part in $parts) {
        if ($excludedDirectoryNames -contains $part) {
            return $true
        }
    }

    return $false
}

function Get-MarkdownTitle {
    param([string]$Path)

    $heading = Get-Content -LiteralPath $Path -TotalCount 60 |
        Where-Object { $_ -match '^\s*#\s+(.+?)\s*$' } |
        Select-Object -First 1

    if ($heading) {
        return ($heading -replace '^\s*#\s+', '').Trim()
    }

    return [System.IO.Path]::GetFileNameWithoutExtension($Path)
}

function Get-NavBucket {
    param([string]$RelativePath)

    switch -Regex ($RelativePath) {
        '^README\.md$' { return 'Overview' }
        '^docs/(PROJECT_OVERVIEW|DEVELOPMENT_TURNS|SCREENSHOT_INDEX)\.md$' { return 'Overview' }
        '^docs/(METHODOLOGY|TAXONOMY|EDITORIAL_POLICY|MONETIZATION_POLICY)\.md$' { return 'Specs' }
        '^docs/(HANDOFF|PUBLIC_CASE_INPUT_TEMPLATE)\.md$' { return 'Runtime State' }
        '^docs/CASE_PUBLICATION_GUIDE\.md$' { return 'Development Notes' }
        '^docs/.*REPORT\.md$' { return 'Artifacts' }
        default { return 'Misc' }
    }
}

function Convert-ToMkDocsPath {
    param([string]$RelativePath)

    if ($RelativePath -eq 'README.md') {
        return '_root_README.md'
    }

    if ($RelativePath.StartsWith('docs/')) {
        return $RelativePath.Substring(5)
    }

    return $null
}

function Quote-YamlScalar {
    param([string]$Value)
    return "'" + ($Value -replace "'", "''") + "'"
}

function Get-RepositoryMarkdownFiles {
    param([string]$Directory)

    foreach ($item in Get-ChildItem -LiteralPath $Directory -Force) {
        if ($item.PSIsContainer) {
            if ($excludedDirectoryNames -contains $item.Name) {
                continue
            }

            Get-RepositoryMarkdownFiles -Directory $item.FullName
            continue
        }

        if ($item.Extension -ieq '.md') {
            $item
        }
    }
}

$buckets = [ordered]@{
    'Overview' = New-Object System.Collections.Generic.List[object]
    'Specs' = New-Object System.Collections.Generic.List[object]
    'Runtime State' = New-Object System.Collections.Generic.List[object]
    'Development Notes' = New-Object System.Collections.Generic.List[object]
    'Artifacts' = New-Object System.Collections.Generic.List[object]
    'Misc' = New-Object System.Collections.Generic.List[object]
}

foreach ($markdownFile in Get-RepositoryMarkdownFiles -Directory $rootPath) {
    $relativePath = Convert-ToRepositoryPath -Path $markdownFile.FullName
    if (Test-IsExcludedPath -RelativePath $relativePath) {
        continue
    }

    if ($generatedDocViewFiles -contains $relativePath) {
        continue
    }

    $mkdocsPath = Convert-ToMkDocsPath -RelativePath $relativePath
    $entry = [pscustomobject]@{
        Title = Get-MarkdownTitle -Path $markdownFile.FullName
        RepositoryPath = $relativePath
        MkDocsPath = $mkdocsPath
        NeedsWrapper = $null -eq $mkdocsPath
    }

    $bucket = Get-NavBucket -RelativePath $relativePath
    $buckets[$bucket].Add($entry)
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add('# Candidate nav for mkdocs.yml. Review before copying.')
$lines.Add('# This repository uses docs_dir: docs, so files outside docs/ need wrappers.')
$lines.Add('nav:')

foreach ($bucketName in $buckets.Keys) {
    $entries = @($buckets[$bucketName] | Sort-Object RepositoryPath)

    if ($bucketName -eq 'Overview') {
        $lines.Add("  - $(Quote-YamlScalar $bucketName):")
        $lines.Add("      - 'Local Documentation View': 'index.md'")
    } elseif ($entries.Count -gt 0) {
        $lines.Add("  - $(Quote-YamlScalar $bucketName):")
    } else {
        continue
    }

    foreach ($entry in $entries) {
        if ($entry.NeedsWrapper) {
            $lines.Add("      # - $(Quote-YamlScalar $entry.Title): $(Quote-YamlScalar $entry.RepositoryPath) # outside docs_dir; add a wrapper first")
            continue
        }

        $lines.Add("      - $(Quote-YamlScalar $entry.Title): $(Quote-YamlScalar $entry.MkDocsPath)")
    }
}

$output = $lines -join [Environment]::NewLine

if ($OutFile) {
    $destination = if ([System.IO.Path]::IsPathRooted($OutFile)) {
        $OutFile
    } else {
        Join-Path $rootPath $OutFile
    }

    if ((Test-Path -LiteralPath $destination) -and -not $Force) {
        throw "Output file already exists. Use -Force to overwrite: $destination"
    }

    Set-Content -LiteralPath $destination -Value $output -Encoding utf8
    Write-Output "Wrote nav candidate to $destination"
} else {
    Write-Output $output
}
