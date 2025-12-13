<!-- src/routes/(app)/admin/words/+page.svelte -->
<script lang="ts">
  export let data;
  let loading = false;
  let message = '';

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    loading = true;
    message = '';

    const formData = new FormData(e.target as HTMLFormElement);
    const res = await fetch('', { method: 'POST', body: formData });

    const result = await res.json();
    if (result.success) {
      message = 'Word added successfully!';
      (e.target as HTMLFormElement).reset();
    } else {
      message = result.error || 'Something went wrong';
    }
    loading = false;
  }
</script>

<svelte:head>
  <title>Add Words • Admin</title>
</svelte:head>

<div class="max-w-8xl mx-auto p-6">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
  <h1 class="text-3xl font-bold text-[#5d4037] mb-8">Add New Word</h1>

  <form method='POST' action='?/addWord' use:enhance class="space-y-6 bg-white p-8 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Word</label>
        <input name="word" required class="w-full px-4 py-3 border border-[#e6d5c3] rounded focus:border-[#d7a022] outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Translation</label>
        <input name="translation" required class="w-full px-4 py-3 border border-[#e6d5c3] rounded focus:border-[#d7a022] outline-none" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Language</label>
        <select name="languageCode" class="w-full px-4 py-3 border border-[#e6d5c3] rounded">
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Part of Speech</label>
        <input name="partOfSpeech" placeholder="noun, verb, etc." class="w-full px-4 py-3 border border-[#e6d5c3] rounded" />
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-[#8d6e63] mb-2">Pronunciation</label>
      <input name="pronunciation" placeholder="e.g. gah-toh" class="w-full px-4 py-3 border border-[#e6d5c3] rounded" />
    </div>

    <button 
      type="submit" 
      disabled={loading}
      class="w-full bg-[#d7a022] hover:bg-[#c4911e] text-white border border-[#e6d5c3] font-medium py-4 rounded transition"
    >
      {loading ? 'Adding...' : 'Add Word'}
    </button>

  </form>

  <!-- Add this right above or below your single-word form -->
<div class="mt-16 p-8 bg-gray-50 rounded-lg">
  <h2 class="text-2xl font-bold text-[#5d4037] mb-6">Bulk Import Words from CSV</h2>
  
  <form method="POST" action="?/importWordCSV" use:enhance enctype="multipart/form-data" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-[#8d6e63] mb-3">
        Upload CSV file
      </label>
      <input 
        type="file" 
        name="csv" 
        accept=".csv,text/csv" 
        required 
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded file:border-0 file:bg-[#d7a022] file:text-white hover:file:bg-[#c4911e]"
      />
      <p class="text-xs text-gray-500 mt-2">
        Required columns: <code class="bg-gray-200 px-1">word</code>, <code class="bg-gray-200 px-1">translation</code><br>
        Optional: <code class="bg-gray-200 px-1">languageCode</code>, <code class="bg-gray-200 px-1">pronunciation</code>, <code class="bg-gray-200 px-1">exampleSentence</code>, etc.
      </p>
    </div>

    <button 
      type="submit"
      class="w-full bg-[#d7a022] hover:bg-[#c4911e] font-medium text-white border border-[#e6d5c3] py-4 rounded transition"
    >
      Import CSV
    </button>
  </form>
</div>
</div>
<div>

<h1 class="text-3xl font-bold text-[#5d4037] mb-8">Add New Sentence</h1>

  <form method='POST' action='?/addSentence' use:enhance class="space-y-6 bg-white p-8 rounded-lg shadow">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Word</label>
        <input name="word" required class="w-full px-4 py-3 border border-[#e6d5c3] rounded focus:border-[#d7a022] outline-none" />
      </div>

      <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Language</label>
        <select name="languageCode" class="w-full px-4 py-3 border border-[#e6d5c3] rounded">
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      
    </div>

    <div>
        <label class="block text-sm font-medium text-[#8d6e63] mb-2">Example Sentence</label>
        <input name="targetSentence" placeholder="" class="w-full px-4 py-3 border border-[#e6d5c3] rounded" />
      </div>

      <div>
      <label class="block text-sm font-medium text-[#8d6e63] mb-2">Translated Sentence</label>
      <input name="translatedSentence" placeholder="" class="w-full px-4 py-3 border border-[#e6d5c3] rounded" />
    </div>
    

    <button 
      type="submit" 
      disabled={loading}
      class="w-full bg-[#d7a022] hover:bg-[#c4911e] text-white border border-[#e6d5c3] font-medium py-4 rounded transition"
    >
      {loading ? 'Adding...' : 'Add Sentence'}
    </button>

  </form>

<div class="mt-16 p-8 bg-gray-50 rounded-lg">
  <h2 class="text-2xl font-bold text-[#5d4037] mb-6">Bulk Import Sentences from CSV</h2>
  
  <form method="POST" action="?/importSentenceCSV" use:enhance enctype="multipart/form-data" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-[#8d6e63] mb-3">
        Upload CSV file
      </label>
      <input 
        type="file" 
        name="csv" 
        accept=".csv,text/csv" 
        required 
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded file:border-0 file:bg-[#d7a022] file:text-white hover:file:bg-[#c4911e]"
      />
      <p class="text-xs text-gray-500 mt-2">
        Required columns: <code class="bg-gray-200 px-1">word</code>, <code class="bg-gray-200 px-1">translation</code><br>
        Optional: <code class="bg-gray-200 px-1">languageCode</code>, <code class="bg-gray-200 px-1">pronunciation</code>, <code class="bg-gray-200 px-1">exampleSentence</code>, etc.
      </p>
    </div>

    <button 
      type="submit"
      class="w-full bg-[#d7a022] hover:bg-[#c4911e] font-medium text-white border border-[#e6d5c3] py-4 rounded transition"
    >
      Import CSV
    </button>
  </form>

</div>
</div>
</div>
</div>