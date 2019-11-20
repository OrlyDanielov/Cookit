using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//התוספת כדי לשלוח מייל
using System.Net;
using System.Net.Mail;
//using System.Net.Mime;

namespace CookitDB.DB_Code
{
    public class Mail
    {       
        public static bool SendMail(string _sender_mail, string _reciver_mail, string _subject, string _message)
        {
            try
            {
                // new SmtpClient("smtp.live.com", 25);
                //cv.Credentials = new NetworkCredential("orlydanielov@outlook.com", "712946od");
                SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);             
                smtp.EnableSsl = true;
                //smtp.Timeout = 10000;
                smtp.Credentials = new System.Net.NetworkCredential("orlydanielov@gmail.com", "712946orlyd");
                smtp.UseDefaultCredentials = true;//false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                //המייל
                MailMessage mail = new MailMessage(_sender_mail,_reciver_mail,_subject,_message); //new MailMessage();
                //שליחת המייל
                smtp.Send(mail);
                Console.WriteLine("email sent succesfully!.");
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
