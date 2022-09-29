<template>
  <div class="w-full min-h-screen bg-grey-100">
    <section class="text-center pt-7">
      <hl O are we doing today?</hl>
    </section>
    <section
      class="w-9/12 max-w-lg p-5 mx-auto flex items-center justify-center mt-7 bg-white shadow rounded"></section>
        <form @submit.prevent>
          <input 
            type="text" 
            class="py-2 px-4 border border-blue-200 focus:outline-blue-300 rounded" 
            placeholder="Add todo"/>
          <button class="border border-blue-200 py-2 px-4 ml-3 hover:bg-blue-200 rounded">Add Todo</button>
        </form>
    </section>
  </div>
</temptate>