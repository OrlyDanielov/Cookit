using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//התוספת כדי לשלוח מייל
using System.Net;
using System.Net.Mail;

namespace CookitDB.DB_Code
{
    public class Mail
    {       
        public static bool SendMail( string _reciver_mail, string _subject, string _message)
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.EnableSsl = true;
                client.Host = "smtp.gmail.com";
                client.Port = 587;
                // setup Smtp authentication
                System.Net.NetworkCredential credentials =
                    new System.Net.NetworkCredential("cookit.reply.is@gmail.com", "cookit2019");
                client.UseDefaultCredentials = false;
                client.Credentials = credentials;
                MailMessage msg = new MailMessage();
                msg.From = new MailAddress("cookit.reply.is@gmail.com");
                msg.To.Add(new MailAddress(_reciver_mail));
                msg.Subject = _subject;
                msg.Body = _message;

                client.Send(msg);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("email can't sent.");
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
