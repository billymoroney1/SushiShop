<script lang="ts">
    export let data;
</script>

<h1>Account</h1>

<div class='account-row'>
    <div class='profile-pic-container'>
        <img src='https://placehold.co/100x100' alt='profile-pic' />
    </div>
    <div class='name-container'>
        <p>First Name</p>
        <div>{data.user.firstName}</div>
        <p>Last Name</p>
        <div>{data.user.lastName}</div>
    </div>
</div>

<div class='account-row'>
    <div class='email-container'>
        <p>Email</p>
        <div>{data.user.email}</div>
    </div>
    <div class='phone-container'>
        <p>Phone</p>
        <div>{data.user.phone}</div>
    </div>
</div>

<!-- Points -->

<!-- Addresses -->

<!-- Payment Methods -->

<!-- Logout and Cart Buttons -->


