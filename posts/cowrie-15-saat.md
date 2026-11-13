![Honeypot'a 15 saatte gelen 1.729 bağlantı: kimse komut çalıştırmadı](posts/img/cowrie-15-saat.png)

Evinin kapısını internete açık bıraksan kim çalar? Ben sahte bir sunucu kurup bunu ölçtüm. Bu yazı, Türkiye'deki honeypotumun 3 Şubat'ta tuttuğu yaklaşık 15 saatlik kaydın özeti.

## Honeypot nedir?

Cowrie adlı bir SSH honeypot kullanıyorum. Dışarıdan gerçek bir sunucu gibi görünen ama hiçbir değeri olmayan bir tuzak. Saldırgan içeri girdiğini sanıyor, ben de her hamlesini kaydediyorum. Gerçek sistemlerime dokunmadan "dışarıda ne dönüyor?" sorusunun cevabını veriyor.

## Rakamlar

- **1.729** bağlantı, **45** benzersiz IP
- **1.640** giriş denemesi, **281** farklı kullanıcı adı
- Sadece **4 IP**, bağlantıların yaklaşık **%61**'ini yaptı
- Kendini tanıtan istemcilerin **%97**'si `SSH-2.0-Go` imzalıydı: Go ile yazılmış otomatik tarayıcılar. Karşıda insan yok, bot var
- Bir ziyaretin süresi ortalama **2 saniye** civarı. Hızlı gel, dene, git

## En ilginç bulgu: Solana

En çok denenen kullanıcı adları şunlar: `root`, sonra `sol`, `solana`, `solv`. Denemelerin yaklaşık %17'si (285 deneme) Solana temalı kullanıcı adlarıyla yapıldı ve bunların hepsi sadece 4 IP'den geldi. Şifre tarafında da `solana` ve `sol123` gibi tahminler vardı.

Solana doğrulayıcı (validator) sunucuları çoğu kurulum rehberinde `sol` adlı bir kullanıcıyla çalıştırılıyor. Yani biri, kripto sunucularını kolay lokma olarak arıyor olabilir. Bu benim yorumum, kesin bir bilgi değil.

## Kapıyı aralık bıraktım, kimse içeri girmedi

Honeypot bazı kullanıcı adı ve şifre kombinasyonlarını bilerek kabul ediyor. 293 kez "giriş başarılı" gördü (`root/admin`, `root/toor` gibi). Ama o oturumların hiçbirinde tek bir komut çalıştırılmadı, tek bir dosya indirilmedi.

Yani botlar sadece "bu şifre çalışıyor mu?" diye bakıp çekilmiş. Muhtemelen çalışan girişleri bir listeye ekliyorlar ve asıl iş sonra, başka bir araçla geliyor. Bu da yorum.

Bir IP ise SSH tüneliyle `1.1.1.1`'in 80. portuna ulaşmayı denedi. Büyük ihtimalle sunucunun internete çıkıp çıkamadığını ya da proxy olarak kullanılıp kullanılamayacağını test ediyordu.

## Küçük detaylar

- İki farklı IP neredeyse birebir aynı kalıpla geldi: ikisi de 258 deneme yaptı, 149 farklı kullanıcı adı denedi. Muhtemelen aynı araç, aynı liste
- En çok denenen şifre `123456` oldu (217 kez)
- Denemelerin neredeyse tamamı bağlantı başına tek şifre: bağlan, bir kez dene, kop, tekrar bağlan

## Sen ne yapmalısın?

SSH'i internete açıyorsan:

1. Şifre yerine **anahtar** kullan
2. **root** ile girişi kapat
3. `sol`, `admin`, `ubuntu` gibi tahmin edilebilir kullanıcı adlarından uzak dur
4. fail2ban gibi bir şeyle tekrar tekrar deneyen IP'leri engelle

## Not

Bu tek bir sensör ve sadece 15 saatlik bir kayıt, yani küçük bir örneklem. Ülke dağılımı çıkarmadım. Daha uzun bir kayıtla karşılaştırmak ilginç olur.
