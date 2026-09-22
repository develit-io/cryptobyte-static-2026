<template>
  <div container pt-40px px-20px pb-100px>
    <div grid grid-cols-1 md:grid-cols-3 gap-40px md:gap-12px justify-between items-start text-12px>
      <div text-center md:text-left>
        <NuxtLink to="/vop" footer-link hover:text-gray-800>
          Všeobecné obchodní podmínky
        </NuxtLink> |
        <NuxtLink to="/gdpr" footer-link hover:text-gray-800>
          GDPR
        </NuxtLink> |
        <Cookies /> |
        <NuxtLink to="/media" footer-link hover:text-gray-800>
          Media
        </NuxtLink>
      </div>
      <div flex flex-row items-center gap-8px justify-center>
        <SocialButton href="https://twitter.com/CByte_Lbc" icon="twitter" title="X / Twitter" />
        <SocialButton href="https://www.facebook.com/CryptoByteLiberec" icon="facebook" title="Facebook" />
        <SocialButton href="https://www.linkedin.com/company/cryptobyteliberec" icon="linkedin" title="LinkedIn" />
      </div>
      <div text-center md:text-right>
        &copy; 2026 CryptoByte<br>
        Stránky vytvořil <NuxtLink to="https://develit.io/" footer-link hover:text-gray-800 target="_blank">
          Develit.io
        </NuxtLink>
      </div>
    </div>

  </div>
</template>
