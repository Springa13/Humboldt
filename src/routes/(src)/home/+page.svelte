<script lang="ts">
	import type { LayoutData } from "../$types";
    import { languages, codeToFlag } from "$lib/language-names";

    // --- SVELTE STATE VARIABLES (Replacing static IDs and script) ---
    // These variables would typically be loaded from an API in a real application.
    
    

    export let data;

    let wordsLearned = data.stats.wordCount;
    let dayStreak = data.stats.sentenceCount;

    let targetLanguage = data.userInfo.targetLanguage;
    const languageObject = languages.find(lang => lang.code === targetLanguage);

    // Check if an object was found before trying to access the flag
    const flagCode = languageObject ? languageObject.flag : undefined;

    let color = 'yellow'

    // The 'library' class had a background image. If you have the image 
    // in your static folder (e.g., /static/library.jpg), you can use it here.
    // NOTE: Tailwind does not support background-blend-mode directly, 
    // so the effect may be slightly different.
    const libraryCardStyle = "background-image: url('/library.jpg'); background-blend-mode: soft-light;";
</script>

<div 
    class="
        min-h-screen 
        font-spectral 
        text-[#5d4037] 
        p-10 sm:p-5
        bg-gradient-to-br 
        from-[#fef5e7] 
        to-[#fce8d0]
        bg-cover
    "
    style="
    background-image: linear-gradient(135deg, rgba(254, 245, 231, 0.9), rgba(252, 232, 208, 0.9) 100%), 
                      url('https://images.unsplash.com/photo-1746051565385-3226d896d612?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
"
>
    
    <header class="text-center mb-[50px] mt-20">
        <h1 class="text-4xl sm:text-3xl font-semibold text-[#5d4037] mb-20">
            Welcome Back!
        </h1>
        
    </header>

    <div 
        class="
            max-w-[1000px] 
            mx-auto
            grid 
            grid-cols-3 
            md:grid-cols-3 
            sm:grid-cols-1 
            gap-6
        "
    >
        
        <a 
            href="/practice" 
            class="
                card 
                p-10 
                rounded-[5px] 
                shadow-[0_8px_32px_rgba(141,110,99,0.15),_0_2px_8px_rgba(141,110,99,0.08)] 
                border 
                border-[#e6d5c3]
                border-2
                text-center 
                transition-all 
                duration-300 
                cursor-pointer 
                no-underline 
                block 
                bg-gradient-to-b 
                from-[#d7a022] 
                to-[#c69020]
                hover:translate-y-[-5px]
                hover:shadow-[0_12px_40px_rgba(141,110,99,0.2),_0_4px_12px_rgba(141,110,99,0.12)]
                hover:from-[#c69020]
                hover:to-[#b58020]
                text-[#fff9f0]
                bg-cover
                p-auto
            "
            
        >
            <div class="text-5xl mb-5">✏️</div>
            <h2 class="text-3xl font-semibold text-[#fff9f0] mb-4 mt-4">Practice</h2>
            <p class="text-base text-[#fff9f0] leading-relaxed font-light">Continue learning with interactive exercises</p>
        </a>

        {#each [{href: '/profile', icon: '👤', title: 'Profile', text: 'View and edit your account settings'}, {href: '/library', icon: '📚', title: 'Library', text: 'Browse saved phrases and vocabulary'}] as item}
            <a 
                href={item.href} 
                class="
                    card 
                    p-10 
                    rounded-[5px] 
                    shadow-[0_8px_32px_rgba(141,110,99,0.15),_0_2px_8px_rgba(141,110,99,0.08)] 
                    border 
                    border-[#e6d5c3]
                    border-2
                    text-center 
                    transition-all 
                    duration-300 
                    cursor-pointer 
                    no-underline 
                    block 
                    bg-gradient-to-b 
                    from-[#fff9f0] 
                    to-[#fffbf5]
                    hover:translate-y-[-5px]
                    hover:shadow-[0_12px_40px_rgba(141,110,99,0.2),_0_4px_12px_rgba(141,110,99,0.12)]
                "
                
            >
                <div class="text-5xl mb-5">{item.icon}</div>
                <h2 class="text-3xl font-semibold text-[#5d4037] mb-4">{item.title}</h2>
                <p class="text-base text-[#8d6e63] leading-relaxed font-light">{item.text}</p>
            </a>
        {/each}
    </div>

    <div 
        class="
            bg-gradient-to-b 
            from-[#fff9f0] 
            to-[#fffbf5]
            p-8 sm:p-6
            rounded-[5px] 
            shadow-[0_8px_32px_rgba(141,110,99,0.15),_0_2px_8px_rgba(141,110,99,0.08)] 
            border 
            border-[#e6d5c3]
            border-2
            max-w-[1000px] 
            mx-auto 
            mt-10 
            flex 
            justify-around 
            flex-wrap 
            gap-8 sm:flex-col sm:gap-5
            grid 
            grid-cols-3 
            md:grid-cols-3 
            sm:grid-cols-1 
            gap-6
        "
    >
        
        <div class="stat-item text-center">
            <div class="text-2xl font-semibold text-[#d7a022] mb-1.5">{wordsLearned}</div>
            <div class="text-sm text-[#8d6e63] font-light">Words</div>
        </div>
        
        <div class="stat-item text-center">
            <div class="text-2xl font-semibold text-[#d7a022] mb-1.5">{codeToFlag(flagCode)}</div>
            <div class="text-sm text-[#8d6e63] font-light">Language</div>
        </div>
        
        <div class="stat-item text-center">
            <div class="text-2xl font-semibold text-[#d7a022] mb-1.5">{dayStreak}</div>
            <div class="text-sm text-[#8d6e63] font-light">Sentences</div>
        </div>
    </div>
    
</div>