$lines = Get-Content 'D:\NEW PROJECTS\Basic-easy-tutor\js\lang-unique-subtopics.js'

$part1 = $lines[0..75]    # header + c (lines 1-76)
$part2 = $lines[146..245]  # java (lines 147-246)
$part3 = $lines[246..309]  # python (lines 247-310)
$part4 = $lines[310..385]  # javascript (lines 311-386)
$part5 = $lines[946..1020] # php (lines 947-1021)

$allParts = $part1 + $part2 + $part3 + $part4 + $part5

# Remove trailing empty line if present
while ($allParts.Count -gt 0 -and $allParts[-1].Trim() -eq '') {
    $allParts = $allParts[0..($allParts.Count - 2)]
}

$allParts | Out-File -FilePath 'D:\NEW PROJECTS\Basic-easy-tutor\js\lang-unique-subtopics-new.js' -Encoding utf8
Write-Host "Extracted $($allParts.Count) lines"
