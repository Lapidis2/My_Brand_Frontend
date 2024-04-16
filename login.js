document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const errorElement = document.getElementById('error-message');

    // @ts-ignore
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Reset error message
        // @ts-ignore
        errorElement.style.display = "none";

        // Get email and password values
        // @ts-ignore
        const email = loginEmail.value.trim();
        // @ts-ignore
        const password = loginPassword.value.trim();
        const userData = { email, password };

        await loginUser(userData, 'error-message');
    });
});

const loginUser = async (userData, errorElementId) => {
    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errors = await response.json();
            const errMessage = errors.message;
            throw new Error(errMessage);
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", JSON.stringify(token));

        // Show success message
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.style.display = "block";
            errorElement.style.backgroundColor = 'green';
            errorElement.innerText = "Login successful!";

            setTimeout(() => {
                errorElement.style.display = "none";
            }, 6000);
        }
          
        // Redirect to admin panel
        window.location.href = "Admin_panel/admin.html";
    } catch (err) {
        console.error(err.message);
        const errorElement = document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.style.display = "block";
            errorElement.style.backgroundColor = 'red';
            errorElement.innerText = err.message;
        }
    }
}
