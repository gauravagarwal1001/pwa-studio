import React, { useMemo } from 'react';
import { PlusSquare } from 'react-feather';

import { useSavedPaymentsPage } from '@magento/peregrine/lib/talons/SavedPaymentsPage/useSavedPaymentsPage';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import Icon from '../Icon';
import LinkButton from '../LinkButton';
import { Title } from '../Head';

import { GET_SAVED_PAYMENTS_QUERY } from './savedPaymentsPage.gql';
import defaultClasses from './savedPaymentsPage.css';

const SavedPaymentsPage = props => {
    const talonProps = useSavedPaymentsPage({
        queries: {
            getSavedPaymentsQuery: GET_SAVED_PAYMENTS_QUERY
        }
    });

    const { handleAddPayment, savedPayments, strings } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const savedPaymentElements = useMemo(() => {
        return savedPayments.map(
            ({ details, public_hash, payment_method_code }) => (
                // TODO: Clean up in PWA-636
                <div key={public_hash}>
                    <div>{payment_method_code}</div>
                    <div>{JSON.stringify(details, null, 2)}</div>
                </div>
            )
        );
    }, [savedPayments]);

    return (
        <div className={classes.root}>
            <Title>{strings.title}</Title>
            <h1 className={classes.heading}>{strings.title}</h1>
            <h3 className={classes.subHeading}>{strings.subHeading}</h3>
            <div className={classes.content}>
                <LinkButton
                    className={classes.addButton}
                    key="addPaymentButton"
                    onClick={handleAddPayment}
                >
                    <Icon
                        classes={{ icon: classes.addIcon }}
                        size={24}
                        src={PlusSquare}
                    />
                    <span className={classes.addText}>
                        {strings.addButtonText}
                    </span>
                </LinkButton>
                {savedPaymentElements}
            </div>
        </div>
    );
};

export default SavedPaymentsPage;