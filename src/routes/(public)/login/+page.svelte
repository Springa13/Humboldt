<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
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
			Login or Register
		</h1>

		{#if form?.message}
			<p class="text-[18px] text-red-600 font-medium mb-[30px]">
				{form.message}
			</p>
		{/if}

		<form method="post" use:enhance class="space-y-8">
			<div class="space-y-6 text-left">
				<div>
					<label 
						for="username" 
						class="block text-[18px] font-medium text-[#5d4037] mb-2"
					>
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						autocomplete="username"
						class="
							w-full 
							px-5 py-4 
							text-[18px] 
							rounded-[16px] 
							border-2 
							border-[#e6d5c3] 
							bg-gradient-to-b 
							from-[#fff9f0] 
							to-[#fef6ed] 
							shadow-[0_2px_8px_rgba(141,110,99,0.1)] 
							focus:outline-none 
							focus:border-[#c69020] 
							focus:shadow-[0_4px_12px_rgba(141,110,99,0.15)] 
							transition-all duration-300
						"
						placeholder="Enter your username"
					/>
				</div>

				<div>
					<label 
						for="password" 
						class="block text-[18px] font-medium text-[#5d4037] mb-2"
					>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						autocomplete="current-password"
						class="
							w-full 
							px-5 py-4 
							text-[18px] 
							rounded-[16px] 
							border-2 
							border-[#e6d5c3] 
							bg-gradient-to-b 
							from-[#fff9f0] 
							to-[#fef6ed] 
							shadow-[0_2px_8px_rgba(141,110,99,0.1)] 
							focus:outline-none 
							focus:border-[#c69020] 
							focus:shadow-[0_4px_12px_rgba(141,110,99,0.15)] 
							transition-all duration-300
						"
						placeholder="Enter your password"
					/>
				</div>
			</div>

			<div class="flex gap-5 justify-center flex-wrap sm:flex-col sm:gap-4">
				<button
					type="submit"
					formaction="?/login"
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
						bg-gradient-to-b 
						from-[#fff9f0] 
						to-[#fef6ed]
						hover:translate-y-[-2px]
						hover:shadow-[0_4px_12px_rgba(141,110,99,0.15)]
						hover:text-[#6d4c41]
						sm:w-full
						cursor-pointer
					"
				>
					Login
				</button>

				<button
					type="submit"
					formaction="?/register"
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
						cursor-pointer
					"
				>
					Register
				</button>
			</div>
		</form>
	</div>
</div>