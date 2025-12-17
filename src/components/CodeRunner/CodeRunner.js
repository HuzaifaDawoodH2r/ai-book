import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './CodeRunner.module.css';

/**
 * CodeRunner component for interactive code execution in Physical AI lessons
 * @param {Object} props
 * @param {string} props.initialCode - Initial code to display
 * @param {string} props.language - Programming language for syntax highlighting
 * @param {string} props.description - Description of the code exercise
 */
export default function CodeRunner({ initialCode = '', language = 'javascript', description = '' }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    // In a real implementation, this would connect to a code execution service
    // For now, we'll just simulate execution
    setTimeout(() => {
      setOutput(`Executed code:\n${code}\n\nOutput would appear here in a real implementation.`);
      setIsRunning(false);
    }, 500);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
  };

  return (
    <div className={clsx('card', styles.codeRunner)}>
      <div className="card__header">
        <h3>Interactive Code</h3>
        <p>{description}</p>
      </div>
      <div className="card__body">
        <div className={styles.codeEditor}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={styles.textarea}
            rows="10"
          />
        </div>
        <div className={styles.controls}>
          <button 
            className={clsx('button button--primary', styles.button)}
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button 
            className={clsx('button button--secondary', styles.button)}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        {output && (
          <div className={styles.output}>
            <h4>Output:</h4>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}