import clsx from 'clsx';
import styles from './styles.module.css';
import github from '../../assets/github-mark.png';

type Props = {
  class?: string,
}

const GithubReference = (props: Props) => (
  <a href="https://github.com/pazdzior-erisit/ml-tic-tac-toe" class={clsx(styles.wrapper, props.class)}>
    <img class={styles.image} src={github} />
    <p class={styles.link}>pazdzior-erisit/ml-tic-tac-toe</p>
  </a>
);

export default GithubReference;
