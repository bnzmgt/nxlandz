<script setup>
    import { useHead, useFetch, useRuntimeConfig } from '#imports'
    import { computed, watchEffect } from '#imports'

    useHead({
      title: 'Geospatica Teknologi Presisi',
      meta: [
        {
          name: 'description',
          content: 'Redefining Quality Through Sustainable Innovation'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/connect/favicon.png'
        }
      ]
    })
    const { baseURL: base } = useRuntimeConfig().app
    const config = useRuntimeConfig()

    const {
      data: pages } = await useFetch(
        `${config.public.wpBaseUrl}/wp-json/wp/v2/pages?slug=landing-bio`, {
          server: false,
          lazy: true
        }
      )
    
    const acf = computed(() => pages.value?.[0]?.acf || {})

    const imageMap = {
      instagram: { src: base + 'icon-ig-w.png', alt: 'Instagram', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' },
      facebook: { src: base + 'icon-fb-w.png', alt: 'Facebook', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' },
      youtube: { src: base + 'icon-wa-w.png', alt: 'YouTube', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' },
      linkedin: { src: base + 'icon-wa-w.png', alt: 'LinkedIn', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' },
      whatsapp: { src: base + 'icon-wa-w.png', alt: 'WhatsApp', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' },
      phone: { src: base + 'icon-wa-w.png', alt: 'Phone', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' },
      website: { src: base + 'icon-globe-w.png', alt: 'Website', color: 'text-white', bg: 'bg-[#D30C36] hover:bg-[#ae0a2d]' }
    }

    const generateContactLink = (contact) => {
      const type = contact.bio_contact_title?.toLowerCase()
      const rawNumber = contact.bio_contact_number
      const number = String(rawNumber || '').replace(/\D/g, '')

      if (type === 'whatsapp') {
          return `https://wa.me/${number}`
      } else if (type === 'phone') {
          return `tel:${number}`
      } else {
          return '#'
      }
    }

</script>

<template>
  <main class="max-w-xl mx-auto p-6">
    <!-- Profile Header -->
    <section class="text-center mb-8">
      <div class="w-28 h-28 mx-auto rounded-full p-4 bg-white border flex items-center justify-center">
        <img
          :src="acf.bio_logo?.url || (base + 'icon-geospatica.png')"
          :alt="acf.bio_logo?.alt || 'Geospatica'"
          class="w-24 h-auto object-cover"
        />
      </div>
      <h1 class="text-2xl font-bold mt-4 mb-2">{{ acf.bio_title }}</h1>
      <p class="text-md text-gray-600 mt-2" v-if="acf.bio_sub_title" v-html="acf.bio_sub_title.replace(/\n/g, '<br>')"></p>
    </section>

    <!-- Social & Links -->
    <section v-if="acf.bio_social_media?.length" class="flex flex-col md:flex-row flex-wrap justify-center gap-4 mb-8">
      <a
        v-for="(item, index) in acf.bio_social_media"
        :key="index"
        :href="item.bio_soc_link?.url"
        :target="item.bio_soc_link?.target || '_self'"
        :class="[
          'flex items-center px-6 py-4 md:py-2 rounded-lg shadow hover:shadow-md transition text-sm',
          imageMap[item.bio_soc_icon?.toLowerCase()]?.bg || 'bg-white',
          imageMap[item.bio_soc_icon?.toLowerCase()]?.color || 'text-gray-800'
        ]"
      >
        <img
          :src="imageMap[item.bio_soc_icon?.toLowerCase()]?.src || ''"
          :alt="imageMap[item.bio_soc_icon?.toLowerCase()]?.alt || item.bio_soc_title"
          class="w-5 h-5 mr-2"
        />
        {{ item.bio_soc_title }}
      </a>
    </section>

    <section v-if="acf.bio_contact" class="flex flex-col items-center gap-2">
      <div
        v-for="(contact, i) in acf.bio_contact"
        :key="i"
        class="flex items-center gap-2 text-sm text-gray-700"
      >
        <a
          :href="generateContactLink(contact)"
          target="_blank"
          class="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 flex"
        >
        <img
          :src="imageMap[contact.bio_contact_title?.toLowerCase()]?.src || ''"
          :alt="imageMap[contact.bio_contact_title?.toLowerCase()]?.alt || contact.bio_contact_title"
          class="w-5 h-5 mr-3"
        />
          {{ contact.bio_contact_title }} Geospatica
        </a>
      </div>
    </section>

    <!-- Promo Section -->
    <section v-if="acf.bio_promo?.length" class="mt-10">
      <h2 class="text-center mb-4 font-semibold">Our Product & Promo</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <a
          v-for="(promo, index) in acf.bio_promo"
          :key="index"
          :href="promo.bio_promo_link"
          target="_blank"
          class="block border rounded-lg shadow hover:shadow-md transition p-4 text-center bg-white"
        >
          <img
            :src="promo.bio_promo_image?.sizes?.['album-grid']"
            :alt="promo.bio_promo_image?.alt || promo.bio_promo_title"
            class="w-full h-auto object-cover rounded mb-3"
          />
          <h3 class="text-lg font-semibold text-gray-800">
            {{ promo.bio_promo_title }}
          </h3>
        </a>
      </div>
    </section>
    
  </main>
</template>
