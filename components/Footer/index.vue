<template>
  <footer>
    <div class="container">
      <div class="footer-list">
        <div class="footer-picture">
          <img src="/images/Footer-girl.jpg" alt="Picture" width="40%">
        </div>
        <div class="all_details">
          <div class="details">Реквизиты</div>
          <div class="bank_details">
            <p>OOO Фото-Софт</p>
            <p>ИНН: 7777777777</p>
            <p>ОГРН: 3333333333333</p>
          </div>
        </div>
        <div class="info">
          <div class="info_name">Информация</div>
          <div class="info_content">
            <p>Пользовательское соглашение</p>
            <p>Помощь</p>
          </div>
        </div>
        <div class="contacts">
          <div class="contacts_name">Контакты</div>
          <div class="phones">
            <a href="tel:+380939876541" class="phone">+380939876541</a>
          </div>
          <div class="email">
            <a href="info:photo@ftkl.ua" class="email">photo@ftkl.ua</a>
          </div>
          <svg-icon @mouseover="vk = 'fl'" @mouseleave="vk = 'st'" :name="`vk_${vk}`" class="icon-vk"></svg-icon>
        </div>
      </div>
      <div class="copyright">
        &copy; 2020 - Splendor inc.
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      vk: "st"
    }
  },
}
</script>
<style lang="scss">
footer {
  background-color: map-get($mainColors, main-4);
  .container {
    font-size: 1.1rem;
    .footer-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      .details, .info_name, .contacts_name {
        font-size: 1.7rem;
        font-weight: 500;
        color: #273F5B;
      }
    }  
  }
}

.icon-vk {
  fill:inherit;
  stroke:inherit;
  stroke-width:inherit;
  transition: all .8s ease;
  width: 32px;
  height: 32px;
}

.icon-vk:hover {
  fill:blue;
}

.copyright {
  text-align: center;
}
</style>