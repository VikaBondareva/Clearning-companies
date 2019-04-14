import React from 'react';
import {SearchMenu} from './SearchForm';
import {CompaniesList} from '../../containers/pages'

export default function HomeComponent() {
    return (
        <div className="home-card main__home-card">
            <SearchMenu/>
            <section className="home-list home-card__home-list">
                <CompaniesList/>
            </section>
        </div>
    );
}