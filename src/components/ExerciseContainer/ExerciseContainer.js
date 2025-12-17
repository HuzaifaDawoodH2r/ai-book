import React from 'react';
import clsx from 'clsx';
import styles from './ExerciseContainer.module.css';

/**
 * Props for the ExerciseContainer component
 * @typedef {Object} ExerciseContainerProps
 * @property {string} title - Title of the exercise
 * @property {string} description - Description of the exercise
 * @property {string} [difficulty] - Difficulty level (beginner, intermediate, advanced)
 * @property {number} [estimatedTime] - Estimated time to complete in minutes
 * @property {React.ReactNode} children - Content of the exercise
 */

/**
 * ExerciseContainer component for hands-on exercises in Physical AI lessons
 * @param {ExerciseContainerProps} props
 */
export default function ExerciseContainer({ title, description, difficulty, estimatedTime, children }) {
  return (
    <div className={clsx('card', styles.exerciseContainer)}>
      <div className="card__header">
        <h3>{title}</h3>
        {difficulty && (
          <span className={clsx('badge', `badge--${difficulty === 'beginner' ? 'success' : difficulty === 'intermediate' ? 'warning' : 'error'}`)}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        )}
        {estimatedTime && (
          <span className="badge badge--info">~{estimatedTime} min</span>
        )}
      </div>
      <div className="card__body">
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
}