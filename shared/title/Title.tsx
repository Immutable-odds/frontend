import styles from './Title.module.scss';

interface Props {
	title?: string;
	description?: string;
	className?: string;
}

const Title = ({ title, description, className }: Props) => {
	return (
		<div className={`${styles.title} ${className}`}>
			<h1>{title}</h1>
			<p>{description}</p>
		</div>
	);
};

export default Title;
