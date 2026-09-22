<script lang="ts" setup>
const description = `Konference nekončí poslední přednáškou. Právě naopak. Po skončení hlavního programu bude následovat tradiční afterparty CryptoByte 2026, určená pro všechny účastníky konference, speakery i partnery. Večer nabídne prostor pro neformální networking, pokračování diskusí i setkání s lidmi z bitcoinové a technologické komunity v uvolněnější atmosféře.

Součástí programu bude živá hudba, čtyři hodiny zdarma na golfovém simulátoru a také jedno překvapení, o kterém zatím nechceme prozrazovat příliš mnoho. Můžeme jen naznačit, že několik známých tváří bitcoinerské scény tentokrát uvidíte v dost netradičních rolích. A bude to stát za to! Kdo nebude na afterparty, jako by nebyl na CryptoByte 2026.

Tak jako po celý den na konferenci, tak i večer na afterparty bude možné za občerstvení platit LN BTC neboli bitcoinem. Chybět nebude točená Plzeň ani speciální menu připravené pouze pro CryptoByte party, včetně položek jako Bitcoin Burger, Satoshiho koule, Beef Stroukalov nebo TACO. Afterparty podporuje Bitcoinmat, díky kterému můžete mít míchané drinky zdarma. Stačí během dne navštívit jejich stánek a pak možná …`
</script>

<template>
  <div>
    <div font-semibold text-gray-900 mt-20px>
      Afterparty CryptoByte 2026
    </div>
    <table text-sm>
      <tbody>
        <tr>
          <td pr-2>
            Kdy:
          </td>
          <td>18:30 – 02:00</td>
        </tr>
        <tr>
          <td>Kde:</td>
          <td>BG klub, Masarykova 1320/16, 460 01 Liberec</td>
        </tr>
        <tr>
          <td>Mapa:</td>
          <td>
            <NuxtLink to="/mapa" target="_blank" rel="noopener" underline text-cb-red>
              Jak se za pár minut přesunout pěšky na místo konání
            </NuxtLink>
          </td>
        </tr>
        <tr>
          <td>Téma:</td>
          <MDC :value="description" class="mdc" tag="td" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td {
  padding: 4px;
  vertical-align: top;
}
</style>
