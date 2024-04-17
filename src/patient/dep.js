// Function to send form data to backend
const savePatientData = async (formData) => {
    try {
        const response = await fetch('http://localhost:5000/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to save patient data');
        }

        console.log('Patient data saved successfully');
    } catch (error) {
        console.error(error.message);
    }
};

export default savePatientData;
