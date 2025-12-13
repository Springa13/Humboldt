<script lang="ts">
	import { goto } from '$app/navigation';

    // --- SVELTE STATE VARIABLES ---
    let searchTerm = '';

    export let data;
    let filteredItems = data.words;
    

    // Filtered list based on search term (Svelte's reactive derived value)
    $: filteredItems = data.words.filter(item => 
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Boolean to check for empty state
    $: isEmpty = filteredItems.length === 0;

</script>

<div 
    class="
        min-h-screen 
        w-full 
        flex 
        justify-center 
        p-5 
        font-spectral 
        text-[#5d4037] 
        bg-gradient-to-br 
        from-[#fef5e7] 
        to-[#fce8d0]
        bg-cover
        bg-fixed
    "

    style="
    background-image: linear-gradient(135deg, rgba(254, 245, 231, 0.9), rgba(252, 232, 208, 0.9) 100%), 
                      url('https://images.unsplash.com/photo-1620927894688-8bcade170468?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds');
"
>
    
    <div 
        class="
            relative 
            w-[95%] 
            max-w-[900px] 
            min-h-screen 
            mt-7
            rounded-sm
            flex 
            flex-col 
            py-16 px-12 
            sm:py-8 sm:px-6
            bg-[rgba(255,255,255,0.7)] 
            
            shadow-[0_8px_32px_rgba(141,110,99,0.15),_0_2px_8px_rgba(141,110,99,0.08)] 
            border 
            border-[rgba(255,250,240,0.8)]
            select-none
        "
    >
        
        <a 
            href="/home" 
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
                rounded-sm
                hover:text-[#8d6e63]
                hover:bg-[rgba(161,136,127,0.1)]
                hover:translate-x-[-2px]
                sm:top-4 sm:left-4
            "
        >
            &larr;
        </a>

        <header class="max-w-[900px] mx-auto mb-10 text-center">
            <h1 class="text-4xl sm:text-3xl font-semibold text-[#5d4037] mb-4">
                Library
            </h1>
            <p class="text-base text-[#8d6e63] font-light">
                Your saved words and phrases
            </p>
        </header>

        <div class="max-w-[900px] mx-auto mb-8 w-full">
            <input 
                type="text" 
                placeholder="Search your library..."
                bind:value={searchTerm}
                class="
                    w-full 
                    py-4 px-5 
                    text-base 
                    font-spectral 
                    rounded-[5px] 
                    text-[#5d4037] 
                    shadow-[0_4px_16px_rgba(141,110,99,0.1)] 
                    transition-all 
                    duration-300
                    bg-gradient-to-b 
                    from-[#fff9f0] 
                    to-[#fffbf5]
                    border 
                    border-[rgba(255,250,240,0.8)]
                    focus:outline-none 
                    focus:border-[#d7a022]
                    focus:shadow-[0_4px_20px_rgba(141,110,99,0.15)]
                "
            />
        </div>

        <!-- <div class="text-center py-20 px-5 text-[#8d6e63]">
            <p class="text-lg font-light">
                No words have been added for this language yet...
            </p>
        </div> -->

        <div class="max-w-[900px] mx-auto w-full grid 
            grid-cols-4 gap-5">
            
            {#if isEmpty}
                <div class="text-center py-20 px-5 text-[#8d6e63]">
                    <p class="text-lg font-light">
                        No words have been added for this language yet...
                    </p>
                </div>
            {:else}
                {#each filteredItems as item}
                    <div 
                        class="
                            p-6 
                            sm:p-5
                            rounded-[5px] 
                            shadow-[0_4px_16px_rgba(141,110,99,0.1)] 
                            border 
                            border-[#d7a022]/25
                            border-1
                            mb-0
                            transition-all 
                            duration-300
                            bg-gradient-to-b 
                            from-[#fff9f0] 
                            to-[#fffbf5]
                            hover:translate-y-[-2px]
                            hover:shadow-[0_6px_20px_rgba(141,110,99,0.15)]
                            cursor-pointer
                        "
                        role="link"
                        tabindex="0"
                        on:click={() => goto(`/learn/${data.targetLanguage}/${encodeURIComponent(item.word)}`)}
                        on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && goto(`/learn/${data.targetLanguage}/${encodeURIComponent(item.word)}`)}
                    >
                        <div class="flex justify-between items-start mb-4 sm:flex-col sm:gap-2">
                            <span class="text-xl sm:text-lg font-semibold text-[#5d4037]">
                                {item.word}
                            </span>
                            <span class="text-lg sm:text-base text-[#d7a022] font-normal">
                                {item.translation}
                            </span>
                        </div>
                        <!-- <p class="text-base text-[#8d6e63] leading-relaxed italic font-light text-left">
                            {item.exampleSentence} - {item.exampleTranslation}
                        </p> -->
                    </div>
                {/each}
            {/if}
        </div>
    </div>
</div>