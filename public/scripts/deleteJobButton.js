document.addEventListener('DOMContentLoaded', () => {
  const deleteJobButtons = Array.from(document.getElementsByClassName('delete-button'));

  deleteJobButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (!window.confirm('Are you sure you want to delete this job? This action is non-reversible!')) {
        event.preventDefault();
      }
    });
  });
});
