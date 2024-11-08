import clsx from 'clsx';
import styles from './styles.module.css';

type Props = {
  class?: string,
  onTrain: () => void,
  onReset: () => void,
}

const Controls = (props: Props) => (
  <div class={clsx(styles.wrapper, props.class)}>
    <button class={clsx(styles.button, styles.train)} onClick={props.onTrain}>Train</button>
    <button class={clsx(styles.button, styles.reset)} onClick={props.onReset}>Reset</button>
  </div>
);

export default Controls;
