<script>
    /** @type {import('./$types').PageData} */
    export let data;
    /** @type {import('./$types').ActionData} */
    export let form;

    let register = false;

    /** @param {MouseEvent} event */
    function changeForm(event){
        if(register){
            register = false;
        } else {
            register = true;
        }
    }
</script>

{#if !register}
<h1>Login</h1>
<form method="POST" action="?/login">
    <label>
        Email
        <input name="email" type="email">
    </label>
    <label>
        Password
        <input name="password" type="password">
    </label>
    <button>Log in</button>
</form>
<p>
    Sign up <span style="color: blue" on:click={changeForm}>here</span>
</p>
{:else}
<h1>Register</h1>
<form method="POST" action="?/register">
    <label>
        Email
        <input name="email" type="email">
    </label>
    <label>
        Password
        <input name="password" type="password">
    </label>
    <button>Log in</button>
</form>
<p>
    Login <span style="color: blue;" on:click={changeForm}>here</span>
</p>
{/if}

<!-- {#if form?.success}
    <p>Successfully logged in!</p>
{/if}

{#if !form?.success}
    <p>Failed to log in</p>
{/if} -->

