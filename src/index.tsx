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

const App = () => {
	// 1. Храним, какие параметры сейчас применены
	const [appliedParams, setAppliedParams] = useState<Params>({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		textColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});

	// 2. Храним, открыт ли сейчас сайдбар
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	// 3. Обработчики для формы
	const handleToggle = () => setSidebarOpen((open) => !open);
	const handleApply = (newParams: Params) => {
		setAppliedParams(newParams);
	};
	const handleReset = () => {
		// сброс к дефолту
		setAppliedParams({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			textColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		});
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
				isOpen={isSidebarOpen}
				initialParams={appliedParams}
				onToggle={handleToggle}
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
