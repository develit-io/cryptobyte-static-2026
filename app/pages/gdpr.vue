<script lang="ts" setup>
definePageMeta({
  colorMode: 'light',
  title: 'GDPR',
})
</script>

<template>
  <div bg-gray-1>
    <Navbar />
    <div container bg-white py-40px>
      <div flex flex-col mt-40px md:mt-12px mb-40px px-20px gap-12px font-300>
        <h1 h1 text-32px>
          Souhlas se zpracováním osobních údajů
        </h1>
        <p>Zakoupením vstupenky na konferenci CryptoByte vyjadřujete souhlas se zpracováním osobních údajů ve smyslu zákona č. 101/2000 Sb., o ochraně osobních údajů. Uvedené údaje budou využity v souvislosti s registrací na akci.</p>
        <p>Dále vyjadřujete souhlas s pořízením audiovizuálního záznamu na konferenci CryptoByte a zveřejněním fotografií a videozáznamů z této akce. Materiál může být zveřejněn na stránkách konference www.cryptobyte.cz, na síti YouTube a všech sociálních sítích, dále mohou pořízené materiály sloužit k propagaci dalších ročníků akce organizátory a jejich smluvními partnery. Souhlasím, aby organizátor konference, Dušan Kmetyo, IČ: 446 010 77 (adresa sídla: Franklinova 579, 460 15, Liberec – Liberec XV-Starý Harcov) zpracovával mé osobní údaje, a to v rozsahu jméno, příjmení, adresa bydliště, e-mailová adresa a telefonní číslo, získané v souvislosti s prodejen vstupenek a poskytováním produktů či služeb.</p>
        <h2 font-500 mt-1em>
          Souhlas se zpracováním osobních údajů uděluji k těmto účelům:
        </h2>
        <ul list-square list-outside pl-1em>
          <li>Informování účastníků o přípravách konference a dalších akcích souvisejících s blockchainovými technologiemi, digitálními měnami, digitálními aktivy atp.</li>
          <li>Nabízení služeb a produktů souvisejících s blockchainovými technologiemi, digitálními měnami, digitálními aktivy atp.</li>
          <li>S výše uvedeným zpracováním udělujete svůj výslovný souhlas.</li>
        </ul>
        <h2 font-500 mt-1em>
          Beru na vědomí, že podle zákona o ochraně osobních údajů mám právo:
        </h2>
        <ul list-square list-outside pl-1em>
          <li>vzít souhlas se zpracováním osobních údajů kdykoliv zpět zasláním e-mailu na adresu info@cryptobyte.cz nebo zasláním dopisu na výše uvedenou adresu sídla organizátora konference,</li>
          <li>požadovat informaci, jak a jaké mé osobní údaje zpracovává,</li>
          <li>požadovat vysvětlení ohledně zpracování osobních údajů,</li>
          <li>vyžádat si přístup k těmto údajům a tyto nechat aktualizovat nebo opravit,</li>
          <li>požadovat výmaz těchto osobních údajů.</li>
        </ul>
        <p>V případě pochybností o dodržování povinností souvisejících se zpracováním osobních údajů se mohu obrátit na organizátora samotného nebo na Úřad pro ochranu osobních údajů.</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
