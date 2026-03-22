use anchor_lang::prelude::*;
use anchor_lang::system_program;

// Cambia lo que tengas por esto exactamente:
declare_id!("7WTDCvr9yeioTdhgdL1LikJhegM285QENZvdkE9BcrtD");

#[program]
pub mod nf_ts_pass {
    use super::*;

    pub fn buy_ticket(ctx: Context<MintTicket>, name: String) -> Result<()> {
        // Transferencia de 0.1 SOL
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.user.to_account_info(),
                to: ctx.accounts.treasury.to_account_info(),
            },
        );
        system_program::transfer(cpi_context, 100_000_000)?;

        msg!("Ticket '{}' comprado exitosamente", name);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct MintTicket<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: Cuenta de tesorería que recibe el pago
    #[account(mut)]
    pub treasury: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
    
    // Si el error de "Stack offset" vuelve, lo manejaremos 
    // dentro de la lógica, no con Box en la estructura por ahora.
}