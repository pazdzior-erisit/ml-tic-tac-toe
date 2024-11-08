import clsx from 'clsx';
import styles from './styles.module.css';

type Props = {
  class?: string,
}

const Loader = (props: Props) => (
  <svg width="100%" height="100%" class={clsx(styles.wrapper, props.class)} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>loader icon</title>
    <defs>
      <mask id="mask" width="100%" height="100%">
        <circle cx="50%" cy="50%" r="50%" fill="white" />
        <circle cx="50%" cy="50%" r="30%" fill="black" />
      </mask>
    </defs>
    <circle cx="50%" cy="50%" r="70%" fill="var(--color-primary-light)" mask="url(#mask)" />
    <circle cx="50%" cy="50%" r="40%" stroke="var(--color-primary)" stroke-width="20%" />
  </svg>
);

export default Loader;
