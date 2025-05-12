import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export interface Params {
	fontFamily: string;
	fontSize: string;
	textColor: string;
	backgroundColor: string;
	contentWidth: string;
}

export interface ArticleParamsFormProps {
	setCurrentSettings: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	setCurrentSettings,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formParams, setFormParams] =
		useState<ArticleStateType>(defaultArticleState);
	const panelRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (isOpen) {
			setFormParams(defaultArticleState);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const toggleSidebar = () => setIsOpen((o) => !o);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentSettings(formParams);
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setCurrentSettings(defaultArticleState);
		setFormParams(defaultArticleState);
	};

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		option: ArticleStateType[K]
	) => {
		setFormParams((ps) => ({ ...ps, [key]: option }));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<form
				ref={panelRef}
				className={clsx(styles.container, styles.form, {
					[styles.container_open]: isOpen,
				})}
				onSubmit={handleSubmit}
				onReset={handleReset}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>
				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={formParams.fontFamilyOption}
					onChange={(opt) => handleChange('fontFamilyOption', opt)}
					onClose={() => {}}
				/>
				<RadioGroup
					title='Размер шрифта'
					name='fontSize'
					options={fontSizeOptions}
					selected={formParams.fontSizeOption}
					onChange={(opt) => handleChange('fontSizeOption', opt)}
				/>
				<Select
					title='Цвет шрифта'
					options={fontColors}
					selected={formParams.fontColor}
					onChange={(opt) => handleChange('fontColor', opt)}
					onClose={() => {}}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={formParams.backgroundColor}
					onChange={(opt) => handleChange('backgroundColor', opt)}
					onClose={() => {}}
				/>
				<Select
					title='Ширина контента'
					options={contentWidthArr}
					selected={formParams.contentWidth}
					onChange={(opt) => handleChange('contentWidth', opt)}
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
