import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';

export interface Params {
	fontFamily: string;
	fontSize: string;
	textColor: string;
	backgroundColor: string;
	contentWidth: string;
}

export interface ArticleParamsFormProps {
	initialParams: Params;
	onApply: (params: Params) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	initialParams,
	onApply,
	onReset,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formParams, setFormParams] = useState<Params>({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		textColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	});
	const panelRef = useRef<HTMLFormElement>(null);

	const handleToggle = () => setIsOpen((open) => !open);

	useEffect(() => {
		if (isOpen) {
			setFormParams(initialParams);
		}
	}, [initialParams, isOpen]);

	useEffect(() => {
		if (isOpen) {
			const handleClickOutside = (e: MouseEvent) => {
				if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
					setIsOpen(false);
				}
			};
			document.addEventListener('mousedown', handleClickOutside);
			return () =>
				document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen]);

	const handleChange = <K extends keyof Params>(key: K, value: Params[K]) => {
		setFormParams((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formParams);
		setIsOpen(false);
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		const defaultParams: Params = {
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			textColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			contentWidth: defaultArticleState.contentWidth.value,
		};
		setFormParams(defaultParams);
		onReset();
	};

	const getSelectedOption = (
		options: OptionType[],
		value: string,
		defaultOption: OptionType
	) => {
		return options.find((opt) => opt.value === value) || defaultOption;
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<form
				ref={panelRef}
				className={clsx(
					styles.container,
					{ [styles.container_open]: isOpen },
					styles.form
				)}
				onSubmit={handleSubmit}
				onReset={handleFormReset}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>
				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={getSelectedOption(
						fontFamilyOptions,
						formParams.fontFamily,
						defaultArticleState.fontFamilyOption
					)}
					onChange={(option) => handleChange('fontFamily', option.value)}
					onClose={() => {}}
				/>
				<RadioGroup
					title='Размер шрифта'
					name='fontSize'
					options={fontSizeOptions}
					selected={getSelectedOption(
						fontSizeOptions,
						formParams.fontSize,
						defaultArticleState.fontSizeOption
					)}
					onChange={(option) => handleChange('fontSize', option.value)}
				/>
				<Select
					title='Цвет шрифта'
					options={fontColors}
					selected={getSelectedOption(
						fontColors,
						formParams.textColor,
						defaultArticleState.fontColor
					)}
					onChange={(option) => handleChange('textColor', option.value)}
					onClose={() => {}}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={getSelectedOption(
						backgroundColors,
						formParams.backgroundColor,
						defaultArticleState.backgroundColor
					)}
					onChange={(option) => handleChange('backgroundColor', option.value)}
					onClose={() => {}}
				/>
				<Select
					title='Ширина контента'
					options={contentWidthArr}
					selected={getSelectedOption(
						contentWidthArr,
						formParams.contentWidth,
						defaultArticleState.contentWidth
					)}
					onChange={(option) => handleChange('contentWidth', option.value)}
					onClose={() => {}}
				/>
				<div className={styles.bottomContainer}>
					<Button title='Сбросить' htmlType='reset' type='clear' />
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</>
	);
};
