import {ActualPage} from "../actual.page";
import * as util from '../../util/util';

const PAGE_NAME = 'user-activation';
export class UserActivationPage implements ActualPage<UserActivationPage> {

    validateTitle(): UserActivationPage {
        cy.get(`[test-page-title]`).should('have.attr', 'test-page-title', PAGE_NAME);
        return this;
    }

    visit(): UserActivationPage {
        cy.visit('/administration-layout/(activation//help:user-help)');
        this.waitForReady();
        return this;
    }

    waitForReady(): UserActivationPage {
        util.waitUntilTestPageReady(PAGE_NAME);
        return this;
    }

    verifyErrorMessageExists(): UserActivationPage {
        util.clickOnErrorMessageToasts();
        return this;
    }

    verifySuccessMessageExists(): UserActivationPage {
        util.clickOnSuccessMessageToasts();
        return this;
    }

    search(search: string): UserActivationPage {
        cy.waitUntil(() => cy.get(`[test-field-search]`))
            .clear({force: true})
            .type(`${search}{enter}`, {force: true})
            .wait(3000)
        return this;
    }

    verifyActivationEntriesSizeInTable(count: number): UserActivationPage {
        cy.get(`[test-table-item-user]`).should('have.length', count);
        return this;
    }

    activateUser(username: string): UserActivationPage {
        cy.waitUntil(() => cy.get(`[test-icon-user-action='ACTIVATE_${username}']`))
            .click({force: true});
        return this;
    }

    deleteUser(username: string): UserActivationPage {
        cy.waitUntil(() => cy.get(`[test-icon-user-action='DELETE_${username}']`))
            .click({force: true});
        return this;
    }
}
