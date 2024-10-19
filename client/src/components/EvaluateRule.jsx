import React, { useState } from 'react';
import axios from 'axios';

const EvaluateRule = () => {
    const [data, setData] = useState([{ name: '', value: '' }]); // State to hold dynamic data fields
    const [ast, setAst] = useState(''); // State to hold the AST input
    const [result, setResult] = useState(null);

    const handleChange = (index, e) => {
        const newData = [...data];
        newData[index][e.target.name] = e.target.value; // Update specific field
        setData(newData);
    };

    const addField = () => {
        setData([...data, { name: '', value: '' }]); // Add new empty field
    };

    const removeField = (index) => {
        const newData = data.filter((_, i) => i !== index); // Remove specific field
        setData(newData);
    };

    const handleAstChange = (e) => {
        setAst(e.target.value); // Update AST state with input
    };

    const parseAstString = (astString) => {
        try {
            // Example simple parsing logic: replace certain characters and structure the object
            // This will vary based on how the AST string is formatted
            const astObject = JSON.parse(astString);
            return astObject;
        } catch (error) {
            console.error("Error parsing AST string:", error);
            return null; // Return null if parsing fails
        }
    };

    const handleEvaluate = async (e) => {
        e.preventDefault();
        if (!ast) {
            alert("Please provide an AST to evaluate.");
            return;
        }

        // Parse the AST string to an object
        const astObject = parseAstString(ast);
        if (!astObject) {
            alert("Invalid AST format.");
            return;
        }

        // Convert data array to an object
        const dataObject = data.reduce((obj, item) => {
            if (item.name) {
                obj[item.name] = item.value;
            }
            return obj;
        }, {});

        try {
            console.log({ astObject });
            const { data } = await axios.post(`http://localhost:${import.meta.env.BACKEND_PORT}/api/evaluate_rules`, { ast: astObject, data: dataObject });

            setResult(data); // Extract result from response
        } catch (error) {
            console.error('Error evaluating rule:', error);
        }
    };

    return (
        <div className="evaluate-rule" style={styles.container}>
            <h3>Evaluate Rule</h3>
            <form onSubmit={handleEvaluate}>
                {data.map((field, index) => (
                    <div key={index} style={styles.fieldContainer}>
                        <input
                            type="text"
                            name="name"
                            value={field.name}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Attribute Name (e.g., age)"
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="value"
                            value={field.value}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Attribute Value (e.g., 35)"
                            style={styles.input}
                        />
                        <button type="button" onClick={() => removeField(index)} style={styles.removeButton}>
                            Remove
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addField} style={styles.addButton}>Add Attribute</button>

                <div>
                    <label style={styles.label}>Rule AST:</label>
                    <textarea
                        rows={Math.max(4, ast.split('\n').length)} // Dynamically adjust rows
                        value={ast}
                        onChange={handleAstChange}
                        placeholder="Enter AST here..."
                        style={styles.textArea}
                    />
                </div>
                <button type="submit" style={styles.button}>Evaluate</button>
            </form>

            {result !== null && (
                <div>
                    <h4>Evaluation Result:</h4>
                    <p>{result ? 'True' : 'False'}</p>
                </div>
            )}
        </div>
    );
};

// Styles
const styles = {
    container: {
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '20px',
    },
    fieldContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
    },
    textArea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical', // Allow vertical resizing
        fontSize: '14px',
        marginBottom: '15px',
        minHeight: '80px', // Set a minimum height
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '14px',
        marginRight: '10px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    addButton: {
        padding: '8px 12px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    removeButton: {
        marginLeft: '10px',
        padding: '8px 12px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default EvaluateRule;
