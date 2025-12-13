<script lang="ts">
	import { onMount, tick } from 'svelte';

    // export let data;

    // Visibility state variables (replace style="visibility: hidden;")
    let answerText = '';
    let showTranslated = false;
    let showNextButton = false;
    let showLearnMore = false;
    let isCorrect = false;
    let submitted = false;
    let languageCode = '';


    let originalPhrase = '';
    let translatedPhrase = '';
    let wordToLearn = ''; // Used for the "Learn more" link
    let actualWord = '';
    let answers: string[] = [];
    let inflections: string[] = []

    onMount(() => {
        console.log("Page mounted!");

        // You can do DOM things here
        // like focusing an element, fetching data (client-side), etc.
        next()
        
        return () => {
            console.log("Page is being destroyed");
        };
    });
    
    let nextButton: HTMLButtonElement;
    let inputField: HTMLInputElement;

     
    function highlight(sentence: string, words: string[], isAnswer = false): string {
        if (!sentence || !words?.length) return sentence || '';

        const style = isAnswer
        ? 'bg-transparent text-[#d7a022] font-bold italic'
        : 'bg-transparent text-[#5d4037] font-bold';

        // Normalise once – NFC is what most text uses
        const normalisedSentence = sentence.normalize('NFC');

        let result = normalisedSentence;

        // Sort longest → shortest so “perché” is matched before “per”
        const sorted = [...words]
        .filter(w => w.trim())
        .sort((a, b) => b.length - a.length);

        for (const word of sorted) {
        // Normalise the word too (in case it comes decomposed)
        const normalisedWord = word.normalize('NFC');

        // Escape regex special chars
        const escaped = normalisedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // \b does not work reliably with Unicode, so we use look-around that understands Unicode
        const regex = new RegExp(`(${escaped})(?=$|[\\s.,!?;:"')\\]])`, 'gi');
        // Alternative (even safer): const regex = new RegExp(`(?<!\\p{L})${escaped}(?!\\p{L})`, 'giu');

        result = result.replace(regex, `<mark class="${style}">$1</mark>`);
        }

        return result;
    }

    function handleSubmit() {
        console.log('Submitted answer:', answerText);
        // Logic to check answer, show results, and display next step
        showTranslated = true;
        showNextButton = true;
        showLearnMore = true;
        submitted = true;
        
        
        answerIsCorrect()
    }

    function answerIsCorrect() {
        const givenAnswer = answerText.trim().toLowerCase();
        
        // answers.push(actualWord)

        const cleanAnswers = answers.map(a =>
            a.toLowerCase()
            .replace(/\(.*?\)/g, '')
            .replace(/[^a-z\s\/-]/g, '')
            .trim()
        );
        console.log(cleanAnswers)
                     // remove empty strings
        // console.log(answers)
        isCorrect = cleanAnswers.includes(givenAnswer);


    }

    async function handleNext() {
        console.log('Moving to next phrase...');
        // Reset state for the next card
        answerText = '';        
        

        showTranslated = false;
        showNextButton = false;
        showLearnMore = false;
        submitted = false;
        isCorrect = false;
        await tick();
        inputField.focus();
        
    }

    async function handleKeydown(e: KeyboardEvent) {
        
        if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
            e.preventDefault();
            if (answerText != '') {
                // submitted = true;
                handleSubmit();
                nextButton.focus();
            }
            
        }
    }

    async function next() {
        
        const res = await fetch('/api/next-practice');
        const { practice } = await res.json();
        
        handleNext()
        originalPhrase = practice?.sentence.targetSentence;
        translatedPhrase = practice?.sentence.translatedSentence;
        wordToLearn = practice?.word.word; // Used for the "Learn more" link
        actualWord = practice?.word.translation;
        languageCode = practice?.word.languageCode;
        answers = practice?.word.alternativeTranslations || [];
        inflections = practice?.word.inflections || [];
        

        answers.push(actualWord)
        inflections.push(wordToLearn)
        
        
    }
</script>

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
            h-[90vh] 
            text-center 
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

        <div 
            class="
                text-2xl 
                flex 
                flex-col 
                h-[50vh] 
                justify-center 
                leading-relaxed 
                px-8 
                flex-grow 
                overflow-auto
            "
        >
            <p class="original text-[#5d4037] mb-5 font-normal">
                {@html highlight(originalPhrase?.toLowerCase(), inflections, false)}
            </p>
            
            {#if showTranslated}
                <p class="translated text-[#d7a022] mb-10 font-normal">
                    {@html highlight(translatedPhrase?.toLowerCase(), answers, true)}
                </p>
            {/if}
        </div>


        <div class="flex justify-center gap-5 mb-8">
            
            
            <!-- svelte-ignore a11y_autofocus -->
            <input on:keydown={handleKeydown}
                type="text" 
                disabled={submitted}
                class="
                    text-[#8d6e63] 
                    py-3 px-6
                    text-lg 
                    rounded-sm
                    border-2 
                    border-[#e6d5c3] 
                    w-[300px] 
                    text-center 
                    transition-colors 
                    duration-300 
                    bg-gradient-to-b 
                    from-[#fff9f0] 
                    to-[#fef6ed]
                    caret-[#e6d5c3]
                    cursor-default
                    focus:bg-gradient-to-b 
                    focus:from-[#fef6ed] 
                    focus:to-[#fdf0e0]
                    focus:text-[#6d4c41]
                    focus:outline-none
                    
                    {submitted 
                        ? isCorrect 
                            ? 'bg-green-100 border-2 border-green-500 text-green-800' 
                            : 'bg-red-100 border-2 border-red-500 text-red-800 shake'
                        : ''}
                "
                bind:value={answerText}
                bind:this={inputField}
                placeholder="" 
                autofocus
            >

        </div>

        <!-- {#if showNextButton} -->
            <button 
                class="
                    text-[#8d6e63] 
                    py-4 
                    text-lg 
                    w-[300px]
                    m-auto
                    rounded-4xl
                    border-2 
                    border-[#e6d5c3] 
                    shadow-[0_2px_8px_rgba(141,110,99,0.1)] 
                    transition-all 
                    duration-300 
                    font-spectral 
                    cursor-pointer 
                    bg-gradient-to-b 
                    from-[#fff9f0] 
                    to-[#fef6ed]
                    hover:bg-gradient-to-b 
                    hover:from-[#fef6ed] 
                    hover:to-[#fdf0e0]
                    hover:text-[#6d4c41]
                    hover:shadow-[0_4px_12px_rgba(141,110,99,0.15)]
                    focus:outline-[#d7a022]
                    
                "
                on:click={next}
                bind:this={nextButton}
                
            >
                next
            </button>
        <!-- {/if} -->

        <!-- {#if showLearnMore} -->
            <a 
                class="
                    text-[#8d6e63d3] 
                    py-3 px-0 
                    text-lg 
                    rounded-lg 
                    cursor-pointer 
                    transition-all 
                    duration-300 
                    
                    no-underline
                    hover:text-[#6d4c41]
                    mx-auto 
                    mt-5 
                    w-max
                "
                href={`/learn/${languageCode}/${wordToLearn}`}
                style="visibility: {showLearnMore ? 'visible' : 'hidden'}"
            >
                
                Learn more about "{wordToLearn}"
                
            </a>
        <!-- {/if} -->

        <style>
            /* This local style block is only for non-utility CSS that Tailwind can't handle */
            input::selection {
                background: transparent;
                color: inherit;
            }
        </style>
    </div>
</div>