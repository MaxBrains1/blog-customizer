import { useState, StrictMode, CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	Params,
} from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Определяем начальные параметры из defaultArticleState
const initialParams: Params = {
	fontFamily: defaultArticleState.fontFamilyOption.value,
	fontSize: defaultArticleState.fontSizeOption.value,
	textColor: defaultArticleState.fontColor.value,
	backgroundColor: defaultArticleState.backgroundColor.value,
	contentWidth: defaultArticleState.contentWidth.value,
};

const App = () => {
	const [appliedParams, setAppliedParams] = useState<Params>(initialParams);

	const handleApply = (newParams: Params) => {
		setAppliedParams(newParams);
	};

	const handleReset = () => {
		setAppliedParams(initialParams);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedParams.fontFamily,
					'--font-size': appliedParams.fontSize,
					'--font-color': appliedParams.textColor,
					'--container-width': appliedParams.contentWidth,
					'--bg-color': appliedParams.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialParams={appliedParams}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
