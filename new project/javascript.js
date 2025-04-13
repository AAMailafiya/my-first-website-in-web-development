
    const form = document.getElementById('saleForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulate submission delay
      successMessage.style.display = 'block';

      form.reset();

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    });
