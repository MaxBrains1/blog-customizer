import { useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App: React.FC = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const cssVars = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--bg-color': articleState.backgroundColor.value,
		'--container-width': articleState.contentWidth.value,
	} as React.CSSProperties;

	return (
		<main className={clsx(styles.main)} style={cssVars}>
			<ArticleParamsForm setCurrentSettings={setArticleState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
