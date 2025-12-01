import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

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

