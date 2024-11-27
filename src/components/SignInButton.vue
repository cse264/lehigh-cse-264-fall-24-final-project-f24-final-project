<template>
    <button class="sign-in-btn">Sign In</button>
</template>

<style scoped>
.sign-in-btn {
  padding: 15px 20px;
  font-size: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: absolute;
  top: 10px;
  right: 10px;
}

.sign-in-btn:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
}
</style>