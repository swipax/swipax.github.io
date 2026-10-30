CISA, Haziran 2026'da yama önceliklendirmesini baştan yazan yeni bir direktif yayımladı: **BOD 26-04**. Resmen sadece ABD federal kurumlarını bağlıyor, ama savunma tarafında çalışan herkes için ders çıkarılacak bir yapısı var.

## Ne değişti?

Direktif eski BOD 19-02 ve BOD 22-01'in yerini alıyor. Yama sırasını artık yalnızca CVSS puanı belirlemiyor. Her zafiyet, etkilediği varlık için dört soruyla değerlendiriliyor:

- Varlık internetten erişilebilir mi?
- Zafiyet CISA'nın KEV (Known Exploited Vulnerabilities) kataloğunda mı?
- Sömürü otomatikleştirilebilir mi?
- Sömürülürse varlığın tam kontrolü ele geçiriliyor mu?

Dördü birden doğruysa süre **3 gün**. Daha düşük risk kombinasyonlarında süre uzuyor, çok düşük riskli olanlar ertelenebiliyor.

## Asıl dikkat çeken kısım: yamadan önce ihlal kontrolü

En yüksek risk kademesinde sadece yama uygulamak yetmiyor. Kurumların, yama gelmeden önce varlığın zaten ele geçirilip geçirilmediğini de kontrol etmesi bekleniyor. Yani "yamaladık, bitti" demek artık yeterli sayılmıyor. Bu, SOC ve olay müdahale ekipleri için doğrudan iş demek: yama günü sadece BT'nin değil, avcılık (threat hunting) ve log analizinin de günü.

## Benim yorumum

Bu direktifin söylediği şey, hızlı yamanın sınırı olduğu: internete açık bir uç cihazda (güvenlik duvarı, VPN, yönetim arayüzü) sömürülen bir zafiyet varsa, yama gelene kadar geçen sürede saldırgan içeride olabilir. Savunma tarafında üç şey önem kazanıyor:

1. Hangi varlıkların internete açık olduğunu bilen güncel bir envanter.
2. KEV listesine yeni giren zafiyetleri otomatik takip etmek.
3. Önceden hazırlanmış bir "ihlal kontrolü" prosedürü: hangi loglara bakılacak, hangi göstergeler aranacak.

Kendi yama önceliklendirme panomda KEV ve EPSS verilerini birleştiriyorum. Bu direktifin "KEV'de mi?" kriterini karşılıyor, ama "internete açık mı?" kriteri için kurumun kendi varlık envanteri gerekiyor. Pano tek başına bunu bilemez.

## Kaynaklar

- CISA, KEV bültenleri ve BOD 26-04 açıklaması: cisa.gov
- Cloud Security Alliance, "CISA's BOD 26-04: A Risk-Based Reset of Patch Rules" (20 Ağustos 2026)
- Infosecurity Magazine, "CISA Orders Agencies to Patch by Risk, Not Severity"
- BleepingComputer, "CISA tells govt agencies to patch critical exploited flaws in 3 days"
