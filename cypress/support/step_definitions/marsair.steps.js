import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given ('User is on the MarsAir home page', () => {
    cy.visit('/RajbirSingh');
    cy.viewport(1920,1080)
})

When ('User selects {string} as the departing date', (departoption) => {
    cy.get('[name="departing"]').select(departoption);
})

When ('User selects {string} as the return date', (returnoption) => {
    cy.get('[name="returning"]').select(returnoption)
})

When ('User searches for flight', () => {
    cy.get('input[type="submit"]').click()
})

Then ('A message containing {string} should be seen', (message) => {
    cy.get('#content p').then($p => {
        const element = $p[0];
        expect(element).to.exist;
        const childNodes = Array.from(element.childNodes);
        const text = childNodes
            .filter((node) => node.nodeType === 3)
            .map((node) => node.textContent.trim())
            .join(' ')
            .trim();

        expect(text).to.contain(message);
    });
})

Then ('User inserts a promotional code {string}', (code) => {
    cy.get('[id="promotional_code"]').clear()
        .type(code);
})

Then ('A promo message containing {string} is displayed', (text) => {
    cy.get('[class="promo_code"]').should('be.visible').and('contain', text)
})

When ('User clicks on logo and lands on the home page with headings {string} {string}', (h2text, h3text) => {
    cy.get("[href='/RajbirSingh']").click()
    cy.url().should('eq', Cypress.config().baseUrl + '/RajbirSingh');
    cy.get('#content h2').contains(h2text)
    cy.get('#content h3').contains(h3text)
    cy.get('[name="departing"]').should('be.visible')
    cy.get('[name="returning"]').should('be.visible')
    cy.get('[id="promotional_code"]').should('be.visible')
    cy.get('input[type="submit"]').should('be.visible')
})
