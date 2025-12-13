<script>
    // No Svelte-specific script logic needed for this static page
</script>

<div 
  class="
    min-h-screen 
    flex 
    justify-center 
    items-center 
    p-5 
    font-spectral 
    text-[#5d4037] 
    bg-cover
  "
  style="background-image: url('https://images.pexels.com/photos/28844154/pexels-photo-28844154.jpeg');"
>
    
    <div 
        class="
            
            bg-[rgba(255,254,252,0.98)] 
            px-16 py-20 
            rounded-[30px] 
            shadow-[0_8px_32px_rgba(141,110,99,0.15),_0_2px_8px_rgba(141,110,99,0.08)] 
            border 
            border-[rgba(255,250,240,0.8)] 
            text-center 
            max-w-xl 
            w-full
            transition-all duration-300
            sm:px-10 sm:py-16
            "
        >
        
        <h1 class="text-[48px] sm:text-[48px] font-semibold text-[#5d4037] mb-[30px] tracking-[-0.5px]">
            Simple Language Learning
        </h1>
        
        <p class="summary text-[20px] sm:text-[18px] leading-[1.7] text-[#8d6e63] mb-[50px] font-light">
            Immerse yourself in a language through vocabulary focused lessons
        </p>
        
        <div class="flex gap-5 justify-center flex-wrap sm:flex-col sm:gap-4">
            
            <a 
                href="/login" 
                id="login-button" 
                class="
                    text-[#8d6e63] 
                    py-4 
                    px-10 
                    text-[18px] 
                    rounded-[16px] 
                    border-2 
                    border-[#e6d5c3] 
                    shadow-[0_2px_8px_rgba(141,110,99,0.1)] 
                    transition-all 
                    duration-300 
                    font-spectral 
                    no-underline 
                    inline-block 
                    bg-gradient-to-b 
                    from-[#fff9f0] 
                    to-[#fef6ed]
                    hover:translate-y-[-2px]
                    hover:shadow-[0_4px_12px_rgba(141,110,99,0.15)]
                    hover:text-[#6d4c41]
                    sm:w-full
                "
            >
                Login
            </a>

            <a 
                href="/login" 
                id="signup-button" 
                class="
                    text-[#fff9f0] 
                    py-4 
                    px-10 
                    text-[18px] 
                    rounded-[16px] 
                    border-2 
                    border-[#c69020] 
                    transition-all 
                    duration-300 
                    font-spectral 
                    no-underline 
                    inline-block 
                    shadow-[0_2px_8px_rgba(141,110,99,0.1)] 
                    bg-gradient-to-b 
                    from-[#d7a022] 
                    to-[#c69020] 
                    hover:translate-y-[-2px]
                    hover:shadow-[0_4px_12px_rgba(141,110,99,0.15)]
                    hover:from-[#c69020]
                    hover:to-[#b58020]
                    hover:text-[#ffffff]
                    sm:w-full
                "
            >
                Get Started
            </a>
        </div>
    </div>
</div>