<script lang="ts">
	
	import type { PageData } from "./$types";

  export let data: PageData;
  $: ({ languageCode, wordData, sentencesForWord } = data);
  
  
  let audioUrl = "/words/" + data.wordData.word.replace(" ", "_") + ".mp3";
</script>

<svelte:head>
  <title>{wordData.word} • Learn {languageCode.toUpperCase()}</title>
</svelte:head>

<div 
  class="
    min-h-screen 
    w-full 
    flex 
    justify-center 
    items-center 
    p-5
    font-spectral 
    text-[#5d4037] 
    bg-cover
  "
  style="
    background-image: linear-gradient(135deg, rgba(254, 245, 231, 0.9), rgba(252, 232, 208, 0.9) 100%), 
                      url('https://images.pexels.com/photos/28844154/pexels-photo-28844154.jpeg');
"
>
    
    <div 
        class="
            relative 
            w-[95%] 
            max-w-[900px] 
            min-h-[90vh]
            rounded-sm
            flex 
            flex-col 
            justify-between 
            py-16 px-12 
            bg-[rgba(255,255,255,0.8)] 
            shadow-[0_8px_32px_rgba(141,110,99,0.15),_0_2px_8px_rgba(141,110,99,0.08)] 
            border 
            border-[rgba(255,250,240,0.8)]
            select-none
            sm:py-8 sm:px-6
            "
    >

         
        
        <button
            on:click={() => window.history.back()}
            class="
                absolute 
                top-10 left-10 
                text-4xl 
                no-underline 
                text-[#a1887f] 
                transition-all 
                duration-300 
                cursor-pointer 
                p-2 px-3 pb-5 
                rounded-[25%]
                hover:text-[#8d6e63]
                hover:bg-[rgba(161,136,127,0.1)]
                hover:translate-x-[-2px]
                sm:top-4 sm:left-4
            "
        >
            &larr;
</button>

        <div class="flex flex-col leading-relaxed px-8 flex-grow">
  <div class="flex items-end gap-4 mt-12 flex-wrap">
    <!-- Word -->
    <h1 class="text-5xl sm:text-6xl font-bold text-[#5d4037] leading-tight">
      {wordData.word}
    </h1>

    <!-- Pronunciation (in parentheses, smaller, slightly lower) -->
    {#if wordData.pronunciation}
      <span class="text-xl text-[#8d6e63] font-medium mb-4">
        ({wordData.pronunciation})
      </span>
    {/if}

    <!-- Part of Speech (pill style, subtle background) -->
    {#if wordData.partOfSpeech}
      <span class="px-3 py-1 mb-4 text-sm font-medium text-[#d7a022] bg-[#d7a022]/10 rounded-full border border-[#d7a022]/30">
        {wordData.partOfSpeech}
      </span>
    {/if}

    <!-- Sound Icon (only shows if audio exists) -->
    <!-- {#if wordData.audioUrl} -->
      <button
        on:click={() => new Audio(audioUrl).play()}
        class="ml-2 p-3 rounded-full bg-[#d7a022]/10 hover:bg-[#d7a022]/20 transition-all 
               border border-[#d7a022]/30 text-[#d7a022] hover:scale-110 mb-2" 
        aria-label="Play pronunciation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      </button>
    <!-- {/if} -->
  </div>

  <!-- Translation -->
  <p class="text-3xl sm:text-4xl text-[#d7a022]  font-medium">
    {wordData.translation}
  </p>
  <div class='border-1 border-top border-[#8d6e63]/50 mt-10'></div>
  {#if wordData.inflections != null && wordData.inflections.length > 0}
  <h2 class="text-sm sm:text-xl text-[#8d6e63] mt-10 font-medium underline underline-offset-4 decoration-1">
    inflections
  </h2>
  <p class="text-sm sm:text-xl text-[#d7a022] mt-5 font-medium">
    {wordData.inflections?.join(', ')}
  </p>
  {/if}
  {#if wordData.alternativeTranslations != null && wordData.alternativeTranslations.length > 0 }
  <h2 class="text-sm sm:text-xl text-[#8d6e63] mt-10 font-medium underline underline-offset-4 decoration-1">
    alternative translations
  </h2>
  <p class="text-sm sm:text-xl text-[#d7a022] mt-5 font-medium">
    {wordData.alternativeTranslations.join(', ')}
  </p>
  {/if}
  <h2 class="text-sm sm:text-xl text-[#8d6e63] mt-10 font-medium underline underline-offset-4 decoration-1">
    examples
  </h2>
  <div class="mt-5 overflow-x-auto">
  <table class="w-full border-collapse">
    <tbody>
      {#each sentencesForWord as sentence (sentence.id)}
        <tr class=" hover:bg-[#fff9f0]/50 transition-colors">
          <!-- Audio Button -->
          <td class="py-5 px-4 text-center w-20">
            
              <button
                on:click={() => new Audio(sentence.audioUrl).play()}
                class="p-2 rounded-full bg-[#d7a022]/10 hover:bg-[#d7a022]/20 
                       border border-[#d7a022]/40 text-[#d7a022] 
                       hover:scale-100 hover:shadow-lg transition-all duration-300
                       focus:outline-none focus:ring-4 focus:ring-[#d7a022]/30 cursor-pointer"
                aria-label="Play audio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            
          </td>

          <!-- Target Sentence (with highlighted word) -->
          <td class="py-5 px-6 text-left">
            <p class="text-xl sm:text-xl leading-relaxed text-[#5d4037] font-medium">
              {sentence.targetSentence}
            </p>
          </td>

          <!-- Translation -->
          <td class="py-5 px-6 text-left">
            <p class="text-lg sm:text-xl text-[#8d6e63] italic leading-relaxed">
              {sentence.translatedSentence} 
            </p>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if sentencesForWord.length === 0}
    <p class="text-center text-gray-500 py-12 text-lg">
      No example sentences yet. Add some in the admin panel!
    </p>
  {/if}
</div>
</div>
            

        

        <style>
            /* This local style block is only for non-utility CSS that Tailwind can't handle */
            input::selection {
                background: transparent;
                color: inherit;
            }
        </style>
    </div>
</div>