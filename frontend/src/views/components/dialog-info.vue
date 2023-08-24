<template>
  <div class="dialog-info">
    <div class="dialog-content">
      <p>{{ infoMessage }}</p>
      <button @click="closeDialog">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogInfo',
  props: {
    infoMessage: {
      type: String,
      default: 'An error occurred.'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close');
    }
  }
}
</script>


<style scoped>
.dialog-info {
  /* Estilos básicos para um modal/diálogo */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
}

button {
  background-color: #007BFF;   
  color: white;              
  padding: 5px 20px;
  margin-top: 20px;        
  border: none;               
  border-radius: 5px;   
  font-size: 16px;         
  cursor: pointer;            
  transition: background-color 0.3s; 
}

button:hover {
  background-color: #0056b3;   
}
</style>