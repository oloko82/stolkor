$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$galleryDir = Join-Path $projectRoot "public\images\gallery"
$imagesDir = Join-Path $projectRoot "public\images"
New-Item -ItemType Directory -Force -Path $galleryDir | Out-Null
New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null

Write-Host "Pobieranie logo..."
Invoke-WebRequest -Uri "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/stolkor-cmyk_0j36jqzc.png" -OutFile (Join-Path $imagesDir "logo.webp")

$images = @(
    @{ File = "realizacja-01.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/A3B0199F-759D-4759-B7A1-AB4CB9D57BEC_w095ppyg.jpeg" },
    @{ File = "realizacja-02.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/0851CEC5-215C-4596-A849-54D02798C062_lfypprbu.jpeg" },
    @{ File = "realizacja-03.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/0742F184-9615-4DC8-BB03-5000CBDF503B_yf6e4ht5.jpeg" },
    @{ File = "realizacja-04.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/9052D681-47A9-4492-8FF5-92AC3B6B1C5A_lb6yagef.jpeg" },
    @{ File = "realizacja-05.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/31F1794F-D1CD-4685-A45B-FA46344B5247_luz2tpv0.jpeg" },
    @{ File = "realizacja-06.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/2F1D764C-9CD6-49C1-84EE-81024E158F62_n53je8uh.jpeg" },
    @{ File = "realizacja-07.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/71D99910-0F44-40F3-8847-745626E85758_r9ivifn6.jpeg" },
    @{ File = "realizacja-08.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/E13DA09E-8CFF-4221-B26E-06E1C5306083_batj8j17.jpeg" },
    @{ File = "realizacja-09.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/562BD824-BED0-4EEF-873E-79146A281877_wxvn5p30.jpeg" },
    @{ File = "realizacja-10.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/22C902E0-3191-4465-8E14-8D01A51D46FD_ph39dbk7.jpeg" },
    @{ File = "realizacja-11.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/7ADB38E2-A0BF-42CD-954A-B106D948A752_iy7rj1m5.jpeg" },
    @{ File = "realizacja-12.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/09F25837-5CD5-47F8-9404-66D75037D82C_1qn1pajl.jpeg" },
    @{ File = "realizacja-13.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/456EB61C-9073-46E2-A415-2ED2DE4D1E04_mpuuet5u.jpeg" },
    @{ File = "realizacja-14.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/7CA281DB-8741-4FAD-8143-E001B054A040_7asr1coj.jpeg" },
    @{ File = "realizacja-15.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/2CFEB40C-4682-4538-B842-8A9CD8817A92_k3sfuagh.jpeg" },
    @{ File = "realizacja-16.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/9ECB9DAB-30EA-4AE2-AC25-A277E821E24C_euse3lj9.jpeg" },
    @{ File = "realizacja-17.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/CEDCB829-4148-4FBB-BE31-EA5554F23D6A_so0f5is7.jpeg" },
    @{ File = "realizacja-18.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/4D3694A7-C651-4B30-A106-E588B2E0CC13_s5lyqgoh.jpeg" },
    @{ File = "realizacja-19.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/5216C411-396F-4F76-B577-1769DFF1F8CB_i0aef9ls.jpeg" },
    @{ File = "realizacja-20.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/01303CCA-D788-41D9-B185-F24D1E3002E0_kutp95do.jpeg" },
    @{ File = "realizacja-21.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/D9874ACD-C1D7-4100-A85A-B84A125A67F1_0gle0f6n.jpeg" },
    @{ File = "realizacja-22.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/96C206D5-BD45-4041-9BD2-8101F0455276_in0oijbr.jpeg" },
    @{ File = "realizacja-23.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/B123FA2F-1D9B-4D7F-B5B2-EA99C186E46E_ouviyz6r.jpeg" },
    @{ File = "realizacja-24.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/BE395136-9415-4046-90A5-81E804640261_8u720ht0.jpeg" },
    @{ File = "realizacja-25.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/BF57F2D0-D52E-4A94-B994-B2AB99865C8F_x1nldkch.jpeg" },
    @{ File = "realizacja-26.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/F234CDDE-B9AD-441E-840F-3D7E1EEAB322_7xtns7cr.jpeg" },
    @{ File = "realizacja-27.jpeg"; Url = "https://cdn.dorik.com/610684064b9b75001210d2f5/6106d3ea4b9b75001210d3df/images/571A64F8-23F2-40AB-B0A4-9587CB11478F_1gqx476e.jpeg" }
)

$i = 0
foreach ($item in $images) {
    $i++
    Write-Host "[$i/$($images.Count)] $($item.File)"
    Invoke-WebRequest -Uri $item.Url -OutFile (Join-Path $galleryDir $item.File)
}

Write-Host ""
Write-Host "Gotowe. Pobrano logo i $($images.Count) zdjęć galerii."
