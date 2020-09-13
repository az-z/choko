<template>
  <footer>
    <div class="container">
      <div class="footer-list">
        <div class="footer-picture">
          <img src="/images/Footer-girl.png" alt="Picture" width="40%">
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
          <svg-icon  :name="`f_${f}`" class="icon-f"></svg-icon>
        </div>
      </div>
    </div>
      <div class="copyright">
        &copy; 2020 - Splendor inc.
      </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      vk: "st", f: "sta",
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
      .footer-picture {
        text-align: center;
      }
      .details, .info_name, .contacts_name {
        font-size: 1.7rem;
        font-weight: 500;
        color: #273F5B;
      }
      .details:after, .info_name:after, .contacts_name:after {
        content: "";
        display: block;
        width: 50px;
        height: 4px;
        background-color: #0081FF;
        margin: 1rem 0 .5rem;
        border-radius: 12px;
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
.icon-f {
  cursor: pointer;
  fill:inherit;
  stroke:inherit;
  stroke-width:inherit;
  transition: all map-get($transitions, fast) ease;
  width: 32px;
  height: 32px;
  &:hover {
    fill: map-get($mainColors, main-3);
  }
}
.copyright {
  text-align: center;
  background-color: #FFFFFF;
  display: block;
  padding: 2rem;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100px;

}
</style>