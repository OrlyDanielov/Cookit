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
    class Mail
    {
        /*
        public static void main()
        {
            SmtpClient cv = new SmtpClient("smtp.live.com", 25);
            cv.EnableSsl = true;
            cv.Credentials = new NetworkCredential("orlydanielov@gmail.com", "712946orlyd");
            try
            {
                cv.Send("orlydanielov@gmail.com", "omer_fridman6@hotmail.com", "test of sending mail from Cookit website", "Hi Omer. successfuly send mail from cookit.");//sender mail, reciver mail, subject, the message
                Console.WriteLine("email sent succesfully!.");
            }
            catch (Exception e)
            {
                Console.WriteLine("email can't sent.");
                Console.WriteLine(e.Message);
            }
        }
        */
        public static bool SendMail(string _sender_mail, string _reciver_mail, string _subject, string _message)
        {
            try
            {
                // new SmtpClient("smtp.live.com", 25);
                SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
                /* SmtpClient smtp = new SmtpClient();
               smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;*/
                smtp.EnableSsl = true;
                smtp.Timeout = 10000;
                smtp.Credentials = new System.Net.NetworkCredential("orlydanielov@gmail.com", "712946orlyd");//NetworkCredential("orlydanielov@gmail.com", "712946orlyd");
                smtp.UseDefaultCredentials = true;//false;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                MailMessage mail = new MailMessage();
                mail.To.Add(_reciver_mail);//"orlydanielov@gmail.com");
                mail.From = new MailAddress(_sender_mail);//"orlydanielov@gmail.com");
                mail.Subject = _subject;//"Reset Password - Cookit";
                mail.Body = _message;


                smtp.Send(mail);
                //smtp.Send(sender_mail, reciver_mail, subject, message);//sender mail, reciver mail, subject, the message
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
