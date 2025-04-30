import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';

// Интерфейс параметров статьи
export interface Params {
	fontFamily: string;
	fontSize: string;
	textColor: string;
	backgroundColor: string;
	contentWidth: string;
}

// Пропсы для компонента
export interface ArticleParamsFormProps {
	isOpen: boolean;
	initialParams: Params;
	onToggle: () => void;
	onApply: (params: Params) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isOpen,
	initialParams,
	onToggle,
	onApply,
	onReset,
}) => {
	const [formParams, setFormParams] = useState<Params>(initialParams);
	const panelRef = useRef<HTMLFormElement>(null);

	// Сбрасываем форму при каждом открытии
	useEffect(() => {
		if (isOpen) {
			setFormParams(initialParams);
		}
	}, [initialParams, isOpen]);

	// Закрытие при клике вне панели
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				isOpen &&
				panelRef.current &&
				!panelRef.current.contains(e.target as Node)
			) {
				onToggle();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onToggle]);

	// Обработчики полей
	const handleChange = <K extends keyof Params>(key: K, value: Params[K]) => {
		setFormParams((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formParams);
		onToggle();
	};

	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormParams(initialParams);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<form
				ref={panelRef}
				className={clsx(
					styles.container,
					{ [styles.container_open]: isOpen },
					styles.form
				)}
				onSubmit={handleSubmit}
				onReset={handleFormReset}>
				{/* Семейство шрифта */}
				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={
						fontFamilyOptions.find(
							(opt) => opt.value === formParams.fontFamily
						) || fontFamilyOptions[0]
					}
					onChange={(option) => handleChange('fontFamily', option.value)}
					onClose={() => {}}
				/>
				<RadioGroup
					title='рАЗМЕР шрифта'
					name='fontSize'
					options={fontSizeOptions}
					selected={
						fontSizeOptions.find((opt) => opt.value === formParams.fontSize) ||
						fontSizeOptions[0]
					}
					onChange={(option) => handleChange('fontSize', option.value)}
				/>
				<Select
					title='Цвет шрифта'
					options={fontColors}
					selected={
						fontColors.find((opt) => opt.value === formParams.textColor) ||
						fontColors[0]
					}
					onChange={(option) => handleChange('textColor', option.value)}
					onClose={() => {}}
				/>
				<Separator />
				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={
						backgroundColors.find(
							(opt) => opt.value === formParams.backgroundColor
						) || backgroundColors[0]
					}
					onChange={(option) => handleChange('backgroundColor', option.value)}
					onClose={() => {}}
				/>
				<Select
					title='Ширина контента'
					options={contentWidthArr}
					selected={
						contentWidthArr.find(
							(opt) => opt.value === formParams.contentWidth
						) || contentWidthArr[0]
					}
					onChange={(option) => handleChange('contentWidth', option.value)}
					onClose={() => {}}
				/>

				{/* Внизу кнопки */}
				<div className={styles.bottomContainer}>
					<Button title='Сбросить' htmlType='reset' type='clear' />
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</>
	);
};
