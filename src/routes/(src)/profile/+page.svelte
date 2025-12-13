<script lang="ts">
	import type { LayoutData } from '../$types';
	import { languages, native_languages, codeToFlag } from '$lib/language-names';

	export let data: LayoutData;

	let targetLanguage = data.userInfo.targetLanguage;

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
    bg-gradient-to-br
    from-[#fef5e7]
    to-[#fce8d0]
  "

  style="
    background-image: linear-gradient(135deg, rgba(254, 245, 231, 0.9), rgba(252, 232, 208, 0.9) 100%), 
                      url('https://images.pexels.com/photos/1022748/pexels-photo-1022748.jpeg');
"
>
	<div
		class="
            relative
            w-[95%]
            max-w-[900px]
            h-[90vh]
            rounded-sm
            flex
            flex-col
            justify-center
            py-16 px-12
            sm:py-8 sm:px-6
            bg-gradient-to-b
            from-[#fff9f0]
            to-[#fffbf5]
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

		<div class="max-w-[500px] mx-auto w-full">
			<h1 class="text-3xl sm:text-2xl font-semibold text-[#5d4037] mb-[50px] text-center">
				Profile
			</h1>

			<form method="POST" class="space-y-8">
				<div class="mb-[30px]">
					<label for="username" class="block text-sm text-[#8d6e63] mb-2.5 font-normal">
						Username
					</label>
					<input
						name="username"
						type="text"
						required
						minlength="3"
						value={data.user.username}
						class="w-full py-4 text-base font-spectral bg-transparent border-b-2 border-[#e6d5c3] text-[#5d4037] focus:outline-none focus:border-b-[#d7a022] transition-colors"
					/>
				</div>

				<div class="mb-[30px]">
					<label for="nativeLanguage" class="block text-sm text-[#8d6e63] mb-2.5 font-normal">
						Native Language
					</label>
					<select
						name="nativeLanguage"
						required
						class="w-full py-4 text-base font-spectral bg-transparent border-b-2 border-[#e6d5c3] text-[#5d4037] focus:outline-none focus:border-b-[#d7a022] transition-colors"
					>
						{#each native_languages as lang}
							<option value={lang.code} selected={lang.code === data.userInfo.nativeLanguage}>
								{codeToFlag(lang.flag)}
								{lang.label}
							</option>
						{/each}
					</select>
				</div>

				<div class="mb-[30px]">
					<label for="targetLanguage" class="block text-sm text-[#8d6e63] mb-2.5 font-normal">
						Learning
					</label>
					<select
						name="targetLanguage"
						bind:value={targetLanguage}
						required
						class="w-full py-4 text-base font-spectral bg-transparent border-b-2 border-[#e6d5c3] text-[#5d4037] focus:outline-none focus:border-b-[#d7a022] transition-colors"
					>
						{#each languages as lang}
							<option value={lang.code} selected={lang.code == data.userInfo.targetLanguage}>
								{codeToFlag(lang.flag)}
								{lang.label}
							</option>
						{/each}
					</select>
				</div>

				<button
					type="submit"
					class="
                        w-full
                        py-4
                        text-base
                        font-spectral
                        rounded-sm
                        cursor-pointer
                        transition-all
                        duration-300
                        border-none
                        bg-gradient-to-b
                        from-[#d7a022]
                        to-[#c69020]
                        text-[#fff9f0]
                        mt-[50px]
                        hover:bg-gradient-to-b
                        hover:from-[#c69020]
                        hover:to-[#b58020]
                        hover:translate-y-[-2px]
                    "
				>
					Save
				</button>
			</form>
		</div>
	</div>
</div>
