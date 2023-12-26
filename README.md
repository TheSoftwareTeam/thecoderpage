# TheCoderPage

TheCoderPage, yazılım geliştiricilerin karşılaştıkları sorunları paylaşabilecekleri ve birlikte çözümler bulabilecekleri bir platformdur.

## Kullanıcı Sayfaları

### User Sayfası

![User Gif](https://github.com/TheSoftwareTeam/thecoderpage/blob/master/gif/User.gif)

Aşağıda, User sayfasının bazı özellikleri görülmektedir...

1. **Anasayfa**
    - TheCoderPage'e giriş yaptıktan sonra kullanıcılar, karşılaştıkları sorunları ve çözümleri görmek için anasayfaya yönlendirilir.

2. **Problem Listesi**
    - Kullanıcılar, karşılaştıkları sorunları listeleyebilir ve bu sorunları diğer kullanıcılarla paylaşabilir.

    - **Problem Detay Sayfası**
        - Her problem için ayrıntılı bir sayfa, problem açıklaması, çözümler ve kullanıcı yorumlarına sahiptir.

3. **Problem Oluşturma**
    - Kullanıcılar, karşılaştıkları sorunları oluşturdukları bir form aracılığıyla paylaşabilirler.

4. **Profil**
    - Kullanıcılar, kendi profillerini yönetebilirler.

    - **Profil Düzenle**
        - Kullanıcılar, adlarını, profil resimlerini ve diğer bilgilerini düzenleyebilirler.

    - **Benim Problemlerim**
        - Kullanıcılar, paylaştıkları sorunları ve bu sorunların durumlarını takip edebilirler.

    - **Hakkında**
        - Kullanıcılar, kendi hakkında bilgi ekleyebilirler.

### Admin Sayfası

![Admin Gif](https://github.com/TheSoftwareTeam/thecoderpage/blob/master/gif/Admin.gif)

Aşağıda, Admin sayfasının bazı özellikleri görülmektedir...


1. **Anasayfa (Grafik)**
    - Admin, platformun genel istatistiklerini görebileceği bir anasayfaya sahiptir.

2. **Problemler**
    - Admin, kullanıcıların paylaştığı problemleri görüntüleyebilir, düzenleyebilir ve silebilir.

3. **Yorumlar**
    - Admin, kullanıcı yorumlarını gözden geçirebilir ve gerektiğinde işlem yapabilir.

4. **Kullanıcılar**
    - Admin, kullanıcıları görüntüleyebilir, profillerini düzenleyebilir ve gerektiğinde kullanıcıları engelleyebilir.

5. **Kategoriler**
    - Admin, problemleri kategorilere ayırabilir ve kategori yönetimini gerçekleştirebilir.

6. **Şikayetler**
    - Admin, kullanıcıların yaptığı şikayetleri gözden geçirebilir ve gerektiğinde işlem yapabilir.

## Genel Özellikler

1. Kullanıcılar, sorunlarına çözüm bulabilmek için diğer kullanıcılarla etkileşimde bulunabilirler.

2. Kullanıcılar, thecoderpage'e kaydolarak kişisel profillerini oluşturabilir ve profil resimleri ekleyebilirler.

3. Kullanıcılar, paylaşılan problemleri beğenebilir, yorum yapabilir ve şikayet edebilirler.

4. Kullanıcılar, kendi paylaştıkları problemlerin çözüm durumunu paylaşabilirler.

5. Kullanıcılar, filtreler veya kategori seçenekleri kullanarak ilgi alanlarına uygun problemlere ulaşabilirler.

6. Admin paneli, rolü admin olan kullanıcılara problemleri, kullanıcıları, kategorileri, yorumları yönetme yetkisi verir. Şikayetleri inceleyebilir ve gereken işlemleri gerçekleştirebilir.

TheCoderPage, yazılım geliştiricileri için etkileşimli ve işlevsel bir platform oluşturarak sorunları birlikte çözme amacını taşımaktadır.

# Projeyi Çalıştırmak İçin Adımlar

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. **Proje Klasörünü İndirme**
   - Projeyi GitHub üzerinden klonlayın veya ZIP olarak indirin.
   ```bash
   git clone <repo-link>
2. **Gerekli Paketleri Yükleme**
   - Terminal veya Komut İstemi'ni kullanarak proje dizinine gidin.
   ```bash
   cd thecoderpage
- Proje dizininde npm paketlerini yüklemek için aşağıdaki komutu kullanın:
   ```bash
   npm install
1. **Verileri API ile Çekme**
   - Proje dizininde, verileri localhost API ile çekmek için şu komutu kullanın:
   ```bash
   npm run api
Bu komut, projedeki data.json dosyasındaki verileri localhost üzerinde çalışan basit bir API ile sağlar.
1. **Kullanıcı Resimlerini Getirme**
   - Terminalde, server klasörüne gidin.
   ```bash
   cd server
- Server klasörü içinde, aşağıdaki komutu kullanarak sunucuyu başlatın:
   ```bash
   node server.js
1. **Projeyi Çalıştırma**
   - Ana proje dizininde, aşağıdaki komutu kullanarak projeyi başlatın:
   ```bash
   npm start
- Bu komut, projenizi yerel ortamda çalıştıracaktır.

Artık projeniz yerel ortamınızda çalışıyor olmalıdır. Tarayıcınızdan http://localhost:3000 adresine giderek projeyi görüntüleyebilirsiniz.
  
