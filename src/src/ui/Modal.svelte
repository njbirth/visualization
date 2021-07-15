<script>
  import { createEventDispatcher } from "svelte";

  const dispatcher = createEventDispatcher();
</script>

<div class="backdrop" on:click={() => dispatcher("cancel")} />
<div class="modal">
  <header>
    <slot name="header">
      <button on:click={() => dispatcher("close")}>x</button>
    </slot>
  </header>
  <div class="content">
    <slot />
  </div>
  <footer>
    <slot name="footer" />
  </footer>
</div>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 25%;
    width: 50%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }

  header {
    border-bottom: 2px solid #ccc;
  }
  button {
    cursor: pointer;
    float: right;
  }
</style>
