<script lang="ts">
    import { page } from '$app/stores';

    // The $page store contains details about the current state, including error information
    $: status = $page.status;
    $: errorMsg = $page.error?.message || 'Something went wrong.';

    // Determine the page title based on the status code
    let title: string;
    switch (status) {
        case 404:
            title = 'Page Not Found';
            break;
        case 500:
            title = 'Server Error';
            break;
        default:
            title = 'An Error Occurred';
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br 
        from-[#fef5e7] 
        to-[#fce8d0]">
    <div class="max-w-md w-full space-y-8 text-center p-10 bg-white shadow-xl rounded-xl">
        
        <h1 clss="text-9xl font-extrabold text-indigo-600">
            {status}
        </h1>
        
        <h2 class="mt-6 text-4xl font-extrabold text-gray-900">
            {title}
        </h2>
        
        <p class="mt-2 text-lg text-gray-600">
            {errorMsg}
        </p>

        <div clss="mt-6">
            <a href="/home" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-b from-[#d7a022] 
                        to-[#c69020]
                        text-[#fff9f0]
                        hover:bg-gradient-to-b 
                        hover:from-[#c69020] 
                        hover:to-[#b58020] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                Go back to the homepage
            </a>
        </div>

        <p class="mt-4 text-xs text-gray-400">
            If the issue persists, please contact support.
        </p>
    </div>
</div>